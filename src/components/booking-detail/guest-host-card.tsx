import { Star } from 'lucide-react'

import type { Booking, VerificationTier } from '#/lib/bookings-store'

const tierMeta: Record<VerificationTier, { label: string; bg: string; text: string }> = {
  unverified: { label: 'Unverified', bg: '#F2F4F7', text: '#475467' },
  basic: { label: 'Basic', bg: '#EFF4FF', text: '#2B59FF' },
  verified: { label: 'Verified', bg: '#ECFDF3', text: '#079455' },
  trusted: { label: 'Trusted', bg: '#F4F3FF', text: '#6938EF' },
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-[#868C98]">{label}</p>
      <p className="text-[14px] font-medium text-[#0A0D14]">{value}</p>
    </div>
  )
}

export function GuestHostCard({ booking }: { booking: Booking }) {
  const tier = tierMeta[booking.guestVerificationTier]

  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0C111D]">Guest</p>
        <Field label="Name" value={booking.guestName} />
        <Field label="Email" value={booking.guestEmail} />
        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">Verification Tier</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22px]"
            style={{ backgroundColor: tier.bg, color: tier.text }}
          >
            {tier.label}
          </span>
        </div>
        <Field
          label="Booking History"
          value={
            booking.priorBookingCount === 0
              ? 'First-time guest'
              : `${booking.priorBookingCount} prior booking${booking.priorBookingCount > 1 ? 's' : ''}`
          }
        />
      </div>

      <div className="flex flex-col gap-4 border-l border-[#F2F4F7] pl-6">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0C111D]">
          {booking.isDoorsManaged ? 'Managed By' : 'Host / Agent'}
        </p>
        <Field label="Name" value={booking.hostName} />
        {booking.isDoorsManaged ? (
          <p className="text-[13px] text-[#868C98]">
            This property is directly managed by Doors — no third-party host to coordinate with.
          </p>
        ) : (
          <>
            {booking.hostRating !== undefined && (
              <div>
                <p className="mb-1 text-[12px] text-[#868C98]">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-[#F79009] text-[#F79009]" strokeWidth={0} />
                  <p className="text-[14px] font-medium text-[#0A0D14]">
                    {booking.hostRating.toFixed(1)}
                  </p>
                </div>
              </div>
            )}
            {booking.hostCompletedBookings !== undefined && (
              <Field
                label="Completed Bookings"
                value={String(booking.hostCompletedBookings)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
