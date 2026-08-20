import { useMemo } from 'react'

import { useBookings, type Booking, type BookingStatus, type PayoutStatus } from '#/lib/bookings-store'
import { useOwners } from '#/lib/owners-store'
import { useProperties } from '#/lib/properties-store'
import { useUsers } from '#/lib/users-store'

const REVENUE_STATUSES: BookingStatus[] = ['CONFIRMED', 'MODIFIED', 'CHECKED_IN', 'COMPLETED']

const STATUS_COLORS: Record<BookingStatus, string> = {
  DRAFT: '#98A2B3',
  HELD: '#F79009',
  PENDING_APPROVAL: '#C4320A',
  CONFIRMED: '#2B59FF',
  MODIFIED: '#6938EF',
  CHECKED_IN: '#0E7090',
  COMPLETED: '#079455',
  CANCELLED: '#667085',
  DISPUTED: '#DF1C41',
  EXPIRED: '#98A2B3',
  FAILED: '#DF1C41',
}

const PAYOUT_COLORS: Record<PayoutStatus, string> = {
  not_due: '#98A2B3',
  queued: '#F79009',
  processing: '#2B59FF',
  processed: '#079455',
  on_hold: '#DF1C41',
}

const PAYOUT_LABELS: Record<PayoutStatus, string> = {
  not_due: 'Not Due',
  queued: 'Queued',
  processing: 'Processing',
  processed: 'Processed',
  on_hold: 'On Hold',
}

const VERIFICATION_LABELS: Record<Booking['guestVerificationTier'], string> = {
  unverified: 'Unverified',
  basic: 'Basic',
  verified: 'Verified',
  trusted: 'Trusted',
}

function monthKey(iso: string) {
  return iso.slice(0, 7) // YYYY-MM
}

function lastNMonths(n: number) {
  const months: { key: string; label: string }[] = []
  const now = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('en-US', { month: 'short' })
    months.push({ key, label })
  }
  return months
}

function revenueOf(booking: Booking) {
  return booking.grossAmount * (1 - booking.commissionRate)
}

export function useDashboardMetrics() {
  const { bookings, needsActionBookings } = useBookings()
  const { properties } = useProperties()
  const { activeOwners, pendingOwners } = useOwners()
  const { activeUsers, archivedUsers, blockedUsers } = useUsers()

  return useMemo(() => {
    const revenueBookings = bookings.filter((b) => REVENUE_STATUSES.includes(b.status))
    const totalRevenue = revenueBookings.reduce((sum, b) => sum + revenueOf(b), 0)

    const months = lastNMonths(6)
    const bookingsByMonth = months.map(({ key, label }) => {
      const inMonth = bookings.filter((b) => monthKey(b.createdAt) === key)
      const revenue = inMonth
        .filter((b) => REVENUE_STATUSES.includes(b.status))
        .reduce((sum, b) => sum + revenueOf(b), 0)
      return { label, bookings: inMonth.length, revenue: Math.round(revenue) }
    })

    // Month-over-month trend, computed only from the two most recent buckets
    // that actually have data — avoids a fabricated "0% -> 0%" or a misleading
    // spike off an empty prior month.
    const nonEmpty = bookingsByMonth.filter((m) => m.bookings > 0)
    let bookingsTrendPct: number | null = null
    let revenueTrendPct: number | null = null
    if (nonEmpty.length >= 2) {
      const [prev, curr] = nonEmpty.slice(-2)
      bookingsTrendPct = prev.bookings === 0 ? null : ((curr.bookings - prev.bookings) / prev.bookings) * 100
      revenueTrendPct = prev.revenue === 0 ? null : ((curr.revenue - prev.revenue) / prev.revenue) * 100
    }

    const statusCounts = new Map<BookingStatus, number>()
    for (const b of bookings) statusCounts.set(b.status, (statusCounts.get(b.status) ?? 0) + 1)
    const bookingStatusBreakdown = Array.from(statusCounts.entries())
      .map(([status, count]) => ({ status, count, color: STATUS_COLORS[status] }))
      .sort((a, b) => b.count - a.count)

    const typeCounts = new Map<string, number>()
    for (const p of properties) typeCounts.set(p.type, (typeCounts.get(p.type) ?? 0) + 1)
    const propertyTypeBreakdown = Array.from(typeCounts.entries()).map(([type, count]) => ({ type, count }))

    const countryCounts = new Map<string, { count: number; flag: string }>()
    for (const p of properties) {
      const entry = countryCounts.get(p.country) ?? { count: 0, flag: p.flag }
      entry.count += 1
      countryCounts.set(p.country, entry)
    }
    const propertyCountryBreakdown = Array.from(countryCounts.entries())
      .map(([country, v]) => ({ country, flag: v.flag, count: v.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    const hostStats = new Map<string, { bookings: number; completed: number; revenue: number }>()
    for (const b of bookings) {
      if (b.isDoorsManaged) continue
      const entry = hostStats.get(b.hostName) ?? { bookings: 0, completed: 0, revenue: 0 }
      entry.bookings += 1
      if (b.status === 'COMPLETED') entry.completed += 1
      if (REVENUE_STATUSES.includes(b.status)) entry.revenue += revenueOf(b)
      hostStats.set(b.hostName, entry)
    }
    const topHosts = Array.from(hostStats.entries())
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5)

    const recentActivity = bookings
      .flatMap((b) => b.timeline.map((event) => ({ ...event, reference: b.reference, bookingId: b.id })))
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
      .slice(0, 6)

    const funnel = [
      { label: 'Confirmed', value: bookings.filter((b) => b.status === 'CONFIRMED').length },
      { label: 'Checked In', value: bookings.filter((b) => b.status === 'CHECKED_IN').length },
      { label: 'Completed', value: bookings.filter((b) => b.status === 'COMPLETED').length },
      { label: 'Cancelled', value: bookings.filter((b) => b.status === 'CANCELLED').length },
    ]

    // Payout pipeline: how much money is sitting in each stage of the payout
    // lifecycle right now — the number an ops admin checks daily.
    const payoutBuckets = new Map<PayoutStatus, { count: number; amount: number }>()
    for (const b of bookings) {
      const entry = payoutBuckets.get(b.payoutStatus) ?? { count: 0, amount: 0 }
      entry.count += 1
      entry.amount += revenueOf(b)
      payoutBuckets.set(b.payoutStatus, entry)
    }
    const payoutBreakdown = (Object.keys(PAYOUT_LABELS) as PayoutStatus[])
      .map((status) => ({
        status,
        label: PAYOUT_LABELS[status],
        color: PAYOUT_COLORS[status],
        count: payoutBuckets.get(status)?.count ?? 0,
        amount: Math.round(payoutBuckets.get(status)?.amount ?? 0),
      }))
      .filter((b) => b.count > 0)

    // Consumer vs corporate split — corporate carries approval/invoicing
    // overhead, so knowing the mix matters operationally.
    const sourceBreakdown = (['consumer', 'corporate'] as const).map((source) => {
      const inSource = bookings.filter((b) => b.source === source)
      return {
        source,
        label: source === 'consumer' ? 'Consumer' : 'Corporate',
        count: inSource.length,
        revenue: Math.round(
          inSource.filter((b) => REVENUE_STATUSES.includes(b.status)).reduce((s, b) => s + revenueOf(b), 0),
        ),
      }
    })

    // Hotel vs shortlet — the two supply types run different ops playbooks.
    const propertyTypeSplit = (['hotel', 'shortlet'] as const).map((type) => {
      const inType = bookings.filter((b) => b.propertyType === type)
      return {
        type,
        label: type === 'hotel' ? 'Hotel' : 'Shortlet',
        count: inType.length,
        revenue: Math.round(
          inType.filter((b) => REVENUE_STATUSES.includes(b.status)).reduce((s, b) => s + revenueOf(b), 0),
        ),
      }
    })

    const totalCommissionEarned = revenueBookings.reduce(
      (sum, b) => sum + b.grossAmount * b.commissionRate,
      0,
    )
    const avgBookingValue = revenueBookings.length > 0 ? totalRevenue / revenueBookings.length : 0

    const tierCounts = new Map<Booking['guestVerificationTier'], number>()
    for (const b of bookings) tierCounts.set(b.guestVerificationTier, (tierCounts.get(b.guestVerificationTier) ?? 0) + 1)
    const guestVerificationBreakdown = (Object.keys(VERIFICATION_LABELS) as Booking['guestVerificationTier'][])
      .map((tier) => ({ tier, label: VERIFICATION_LABELS[tier], count: tierCounts.get(tier) ?? 0 }))
      .filter((t) => t.count > 0)

    const firstTimeGuestCount = bookings.filter((b) => b.priorBookingCount === 0).length
    const repeatGuestCount = bookings.length - firstTimeGuestCount

    const usersByStatus = [
      { label: 'Active', value: activeUsers.length },
      { label: 'Archived', value: archivedUsers.length },
      { label: 'Blocked', value: blockedUsers.length },
    ]

    const ownerTypeCounts = new Map<string, number>()
    for (const o of [...activeOwners, ...pendingOwners]) {
      ownerTypeCounts.set(o.userType, (ownerTypeCounts.get(o.userType) ?? 0) + 1)
    }
    const ownersByType = Array.from(ownerTypeCounts.entries()).map(([label, value]) => ({ label, value }))

    const propertyListingStatusCounts = new Map<string, number>()
    for (const p of properties) {
      const label = p.status === 'RENT' ? 'For Rent' : 'For Sale'
      propertyListingStatusCounts.set(label, (propertyListingStatusCounts.get(label) ?? 0) + 1)
    }
    const propertiesByListingStatus = Array.from(propertyListingStatusCounts.entries()).map(([label, value]) => ({
      label,
      value,
    }))

    return {
      totalRevenue,
      revenueTrendPct,
      totalBookings: bookings.length,
      bookingsTrendPct,
      totalProperties: properties.length,
      totalOwners: activeOwners.length + pendingOwners.length,
      pendingOwners: pendingOwners.length,
      totalUsers: activeUsers.length + archivedUsers.length + blockedUsers.length,
      disputedCount: bookings.filter((b) => b.status === 'DISPUTED').length,
      needsActionCount: needsActionBookings.length,
      bookingsByMonth,
      bookingStatusBreakdown,
      propertyTypeBreakdown,
      propertyCountryBreakdown,
      topHosts,
      recentActivity,
      funnel,
      payoutBreakdown,
      sourceBreakdown,
      propertyTypeSplit,
      totalCommissionEarned,
      avgBookingValue,
      guestVerificationBreakdown,
      firstTimeGuestCount,
      repeatGuestCount,
      usersByStatus,
      ownersByType,
      propertiesByListingStatus,
    }
  }, [bookings, needsActionBookings, properties, activeOwners, pendingOwners, activeUsers, archivedUsers, blockedUsers])
}
