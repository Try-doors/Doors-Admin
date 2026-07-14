import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import { CancelBookingModal } from '#/components/booking-detail/cancel-booking-modal'
import { CorporateContextCard } from '#/components/booking-detail/corporate-context-card'
import { DisputePanel } from '#/components/booking-detail/dispute-panel'
import { GuestHostCard } from '#/components/booking-detail/guest-host-card'
import { PaymentEscrowCard } from '#/components/booking-detail/payment-escrow-card'
import { SummaryHeader } from '#/components/booking-detail/summary-header'
import { TimelineCard } from '#/components/booking-detail/timeline-card'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { SuccessToast } from '#/components/profile/success-toast'
import { useBookings } from '#/lib/bookings-store'

export const Route = createFileRoute('/bookings_/$bookingId')({ component: BookingDetail })

function BookingDetail() {
  const { bookingId } = Route.useParams()
  const navigate = useNavigate()
  const { bookings, cancelBooking, resolveDispute, approveBooking, addTimelineEvent } = useBookings()

  const booking = bookings.find((b) => b.id === bookingId)

  const [showCancelModal, setShowCancelModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function goBack() {
    navigate({ to: '/bookings' })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="flex w-fit items-center gap-1 text-[14px] font-medium text-[#2B59FF] hover:underline"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
            Back
          </button>
          {toast && <SuccessToast message={toast} onDismiss={() => setToast(null)} />}
        </div>

        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Booking Details</h1>

        {!booking ? (
          <p className="py-12 text-center text-[14px] text-[#525866]">Booking not found.</p>
        ) : (
          <>
            <SummaryHeader
              booking={booking}
              onMessageGuest={() => setToast('Messaging is not available in this preview')}
              onMessageHost={() => setToast('Messaging is not available in this preview')}
              onResendConfirmation={() => {
                addTimelineEvent(booking.id, {
                  at: new Date().toISOString(),
                  actor: 'admin',
                  actorName: 'You',
                  description: 'Confirmation email resent to guest',
                })
                setToast('Confirmation resent')
              }}
              onCancel={() => setShowCancelModal(true)}
              onApprove={() => {
                approveBooking(booking.id)
                setToast('Booking approved')
              }}
            />

            {booking.dispute && (
              <DisputePanel
                booking={booking}
                onResolve={(resolution, note) => {
                  resolveDispute(booking.id, resolution, note)
                  setToast('Dispute resolved')
                }}
              />
            )}

            <GuestHostCard booking={booking} />
            <PaymentEscrowCard booking={booking} />
            <CorporateContextCard booking={booking} />
            <TimelineCard booking={booking} />

            {showCancelModal && (
              <CancelBookingModal
                onCancel={() => setShowCancelModal(false)}
                onConfirm={(reason) => {
                  cancelBooking(booking.id, reason)
                  setShowCancelModal(false)
                  setToast('Booking cancelled')
                }}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
