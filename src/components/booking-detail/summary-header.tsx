import { Building2, CheckCircle2, Home, MessageSquare, RefreshCw, Users2, XCircle } from 'lucide-react'

import { BookingStatusBadge } from '#/components/bookings/booking-status-badge'
import type { Booking } from '#/lib/bookings-store'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const cancellableStatuses = new Set(['HELD', 'PENDING_APPROVAL', 'CONFIRMED', 'MODIFIED'])

export function SummaryHeader({
  booking,
  onMessageGuest,
  onMessageHost,
  onResendConfirmation,
  onCancel,
  onApprove,
}: {
  booking: Booking
  onMessageGuest: () => void
  onMessageHost: () => void
  onResendConfirmation: () => void
  onCancel: () => void
  onApprove?: () => void
}) {
  const PropertyIcon = booking.propertyType === 'hotel' ? Building2 : Home

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">
            {booking.reference}
          </p>
          <BookingStatusBadge status={booking.status} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onMessageGuest}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            <MessageSquare className="size-4" strokeWidth={1.75} />
            Message Guest
          </button>
          <button
            type="button"
            onClick={onMessageHost}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            <MessageSquare className="size-4" strokeWidth={1.75} />
            Message Host
          </button>
          <button
            type="button"
            onClick={onResendConfirmation}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            <RefreshCw className="size-4" strokeWidth={1.75} />
            Resend Confirmation
          </button>
          {booking.status === 'PENDING_APPROVAL' && onApprove && (
            <button
              type="button"
              onClick={onApprove}
              className="flex items-center gap-1.5 rounded-lg bg-[#2B59FF] px-3 py-1.5 text-[13px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
            >
              <CheckCircle2 className="size-4" strokeWidth={1.75} />
              Approve Booking
            </button>
          )}
          {cancellableStatuses.has(booking.status) && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 rounded-lg border border-[#FDA29B] bg-white px-3 py-1.5 text-[13px] font-medium text-[#DF1C41] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              <XCircle className="size-4" strokeWidth={1.75} />
              Cancel Booking
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-[#F2F4F7] pt-4">
        <div className="flex items-center gap-1.5 text-[14px] text-[#31353F]">
          <PropertyIcon className="size-4 text-[#868C98]" strokeWidth={1.75} />
          {booking.propertyName}
        </div>
        <div className="text-[14px] text-[#31353F]">
          {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
        </div>
        <div className="flex items-center gap-1.5 text-[14px] text-[#31353F]">
          <Users2 className="size-4 text-[#868C98]" strokeWidth={1.75} />
          {booking.guestName} · {booking.guestCount} guest{booking.guestCount > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
