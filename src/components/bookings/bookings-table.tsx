import { Building2, Home } from 'lucide-react'

import { BookingFlags } from '#/components/bookings/booking-flags'
import { BookingStatusBadge } from '#/components/bookings/booking-status-badge'
import { PayoutStatusBadge } from '#/components/bookings/payout-status-badge'
import type { Booking } from '#/lib/bookings-store'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

function formatAmount(booking: Booking) {
  return `₦${booking.grossAmount.toLocaleString('en-NG')}`
}

export function BookingsTable({
  bookings,
  onView,
}: {
  bookings: Booking[]
  onView: (id: string) => void
}) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 py-24 text-center">
        <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          No bookings match these filters
        </p>
        <p className="text-[14px] text-[#31353F]">Try adjusting or resetting your filters</p>
      </div>
    )
  }

  return (
    <table className="w-full min-w-[1080px] border-collapse text-left">
      <thead>
        <tr className="border-b border-[#F6F8FA]">
          <th className="py-3 pl-5 text-[13px] font-medium text-[#0C111D]">Reference</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Guest</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Property</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Host / Agent</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Check-in / out</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Status</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Amount</th>
          <th className="py-3 text-[13px] font-medium text-[#0C111D]">Payout</th>
          <th className="py-3 pr-5 text-[13px] font-medium text-[#0C111D]">Flags</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr
            key={booking.id}
            onClick={() => onView(booking.id)}
            className={
              'cursor-pointer hover:bg-[#F9FAFB] ' +
              (index < bookings.length - 1 ? 'border-b border-[#F6F8FA]' : '')
            }
          >
            <td className="py-3.5 pl-5">
              <p className="text-[13px] font-medium text-[#0A0D14]">{booking.reference}</p>
              <p className="text-[11px] text-[#868C98]">
                {booking.source === 'corporate' ? 'Corporate' : 'Consumer'}
              </p>
            </td>
            <td className="py-3.5 pr-4">
              <p className="text-[13px] text-[#31353F]">{booking.guestName}</p>
            </td>
            <td className="py-3.5 pr-4">
              <div className="flex items-center gap-1.5">
                {booking.propertyType === 'hotel' ? (
                  <Building2 className="size-4 shrink-0 text-[#868C98]" strokeWidth={1.75} />
                ) : (
                  <Home className="size-4 shrink-0 text-[#868C98]" strokeWidth={1.75} />
                )}
                <p className="max-w-[180px] truncate text-[13px] text-[#31353F]">
                  {booking.propertyName}
                </p>
              </div>
            </td>
            <td className="py-3.5 pr-4">
              <p className="text-[13px] text-[#31353F]">{booking.hostName}</p>
            </td>
            <td className="py-3.5 pr-4">
              <p className="whitespace-nowrap text-[13px] text-[#31353F]">
                {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
              </p>
            </td>
            <td className="py-3.5 pr-4">
              <BookingStatusBadge status={booking.status} />
            </td>
            <td className="py-3.5 pr-4">
              <p className="whitespace-nowrap text-[13px] font-medium text-[#0A0D14]">
                {formatAmount(booking)}
              </p>
            </td>
            <td className="py-3.5 pr-4">
              <PayoutStatusBadge status={booking.payoutStatus} />
            </td>
            <td className="py-3.5 pr-5">
              <BookingFlags booking={booking} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
