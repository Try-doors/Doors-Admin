import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { BookingFiltersBar, emptyBookingFilters, type BookingFilters } from '#/components/bookings/booking-filters-bar'
import { BookingMetricCards } from '#/components/bookings/booking-metric-cards'
import { BookingsTable } from '#/components/bookings/bookings-table'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { OwnersPagination } from '#/components/owners/owners-pagination'
import { useBookings, type Booking } from '#/lib/bookings-store'

export const Route = createFileRoute('/bookings')({ component: BookingsPage })

function matchesFilters(booking: Booking, filters: BookingFilters) {
  if (filters.statuses.size > 0 && !filters.statuses.has(booking.status)) return false
  if (filters.propertyType !== 'all' && booking.propertyType !== filters.propertyType) return false
  if (filters.source !== 'all' && booking.source !== filters.source) return false
  if (filters.flaggedOnly) {
    const { disputed, outOfPolicy } = booking.flags
    const isFailed = booking.status === 'FAILED'
    if (!disputed && !outOfPolicy && !isFailed) return false
  }
  if (filters.agentOrHotel) {
    const needle = filters.agentOrHotel.toLowerCase()
    const haystack = `${booking.hostName} ${booking.propertyName}`.toLowerCase()
    if (!haystack.includes(needle)) return false
  }
  const dateValue = booking[filters.dateField]
  if (filters.dateFrom && dateValue.slice(0, 10) < filters.dateFrom) return false
  if (filters.dateTo && dateValue.slice(0, 10) > filters.dateTo) return false
  return true
}

function BookingsPage() {
  const navigate = useNavigate()
  const { bookings, needsActionBookings } = useBookings()
  const [tab, setTab] = useState<'all' | 'needs_action'>('all')
  const [filters, setFilters] = useState<BookingFilters>(emptyBookingFilters)

  const source = tab === 'all' ? bookings : needsActionBookings
  const filtered = source.filter((b) => matchesFilters(b, filters))

  function goToBooking(id: string) {
    navigate({ to: '/bookings/$bookingId', params: { bookingId: id } })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Bookings</h1>
        </div>

        <BookingMetricCards />

        <div className="flex gap-4 border-b border-[#F2F4F7]">
          <button
            type="button"
            onClick={() => setTab('all')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'all' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            All Bookings
            <span className={'h-0.5 w-full ' + (tab === 'all' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
          </button>
          <button
            type="button"
            onClick={() => setTab('needs_action')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'needs_action' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            <span className="flex items-center gap-1.5">
              Needs Action
              <span className="flex size-4 items-center justify-center rounded-full bg-[#FEE4E2] text-[8px] font-semibold uppercase tracking-[-0.16px] text-[#DF1C41]">
                {String(needsActionBookings.length).padStart(2, '0')}
              </span>
            </span>
            <span
              className={'h-0.5 w-full ' + (tab === 'needs_action' ? 'bg-[#2B59FF]' : 'bg-transparent')}
            />
          </button>
        </div>

        <BookingFiltersBar filters={filters} onChange={setFilters} />

        <div className="overflow-x-auto rounded-2xl bg-white">
          <BookingsTable bookings={filtered} onView={goToBooking} />
        </div>

        {filtered.length > 0 && <OwnersPagination total={filtered.length} />}
      </div>
    </DashboardLayout>
  )
}
