import { AlertTriangle, Bell, Building2, CalendarCheck, Crown, ListChecks, PiggyBank, Receipt, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { TrendBadge } from '#/components/dashboard/trend-badge'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

function formatNaira(amount: number) {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`
}

type Stat = {
  label: string
  value: string
  trendPct: number | null
  icon: LucideIcon
}

export function StatCards() {
  const m = useDashboardMetrics()

  const stats: Stat[] = [
    { label: 'Total Revenue', value: formatNaira(m.totalRevenue), trendPct: m.revenueTrendPct, icon: Bell },
    { label: 'Total Bookings', value: String(m.totalBookings), trendPct: m.bookingsTrendPct, icon: CalendarCheck },
    { label: 'Avg Booking Value', value: formatNaira(m.avgBookingValue), trendPct: null, icon: Receipt },
    { label: 'Commission Earned', value: formatNaira(m.totalCommissionEarned), trendPct: null, icon: PiggyBank },
    { label: 'Total Properties', value: String(m.totalProperties), trendPct: null, icon: Building2 },
    { label: 'Total Owners', value: String(m.totalOwners), trendPct: null, icon: Crown },
    { label: 'Total Users', value: String(m.totalUsers), trendPct: null, icon: Users },
    { label: 'Needs Action', value: String(m.needsActionCount), trendPct: null, icon: ListChecks },
    { label: 'Disputed', value: String(m.disputedCount), trendPct: null, icon: AlertTriangle },
  ]

  return (
    <div className="flex flex-wrap gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-[120px] w-full flex-col justify-center gap-3 rounded-lg border border-[#E2E4E9] bg-white p-4 sm:w-[256px]"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center rounded-full bg-[#F5F8FF] p-1">
              <stat.icon className="size-3 text-[#2B59FF]" strokeWidth={2} />
            </div>
            <p className="text-[12px] text-[#525866]">{stat.label}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[24px] font-bold leading-8 text-[#0A0D14]">{stat.value}</p>
            {stat.trendPct !== null && (
              <div className="flex h-[19px] items-center gap-[3px]">
                <TrendBadge direction={stat.trendPct >= 0 ? 'up' : 'down'} />
                <p className="text-[12px] text-[#525866]">
                  {Math.abs(stat.trendPct).toFixed(1)}% vs last month
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
