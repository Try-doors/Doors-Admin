import { Check } from 'lucide-react'

import type { Booking, EscrowState } from '#/lib/bookings-store'
import { PayoutStatusBadge } from '#/components/bookings/payout-status-badge'

const escrowSteps: { key: EscrowState; label: string }[] = [
  { key: 'authorized', label: 'Authorized' },
  { key: 'captured', label: 'Captured' },
  { key: 'payout_queued', label: 'Payout Queued' },
  { key: 'processed', label: 'Processed' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatAmount(amount: number, currency: string) {
  const symbol = currency === 'NGN' ? '₦' : `${currency} `
  return `${symbol}${amount.toLocaleString('en-NG')}`
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-[#868C98]">{label}</p>
      <p className="text-[14px] font-medium text-[#0A0D14]">{value}</p>
    </div>
  )
}

export function PaymentEscrowCard({ booking }: { booking: Booking }) {
  const commission = booking.grossAmount * booking.commissionRate
  const netPayout = booking.grossAmount - commission
  const currentIndex = escrowSteps.findIndex((s) => s.key === booking.escrowState)

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0C111D]">
        Payment &amp; Escrow
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Gross Amount" value={formatAmount(booking.grossAmount, booking.currency)} />
        <Field
          label="Commission"
          value={`${formatAmount(commission, booking.currency)} (${(booking.commissionRate * 100).toFixed(0)}%)`}
        />
        <Field label="Net Payout" value={formatAmount(netPayout, booking.currency)} />
        <Field label="Payment Method" value={booking.paymentMethod} />
        {booking.fxLockRate && (
          <Field label="FX Lock Rate" value={`1 USD = ₦${booking.fxLockRate.toLocaleString('en-NG')}`} />
        )}
        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">Payout Status</p>
          <PayoutStatusBadge status={booking.payoutStatus} />
        </div>
        {booking.payoutDate && (
          <Field label="Payout Date" value={formatDate(booking.payoutDate)} />
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#F2F4F7] pt-4">
        <p className="text-[13px] font-medium text-[#525866]">Escrow State</p>
        <div className="flex items-center">
          {escrowSteps.map((step, index) => {
            const done = index <= currentIndex
            return (
              <div key={step.key} className="flex min-w-0 flex-1 items-center last:flex-none">
                <div className="flex min-w-0 flex-col items-center gap-1.5">
                  <span
                    className={
                      'flex size-6 items-center justify-center rounded-full text-[11px] font-semibold ' +
                      (done ? 'bg-[#2B59FF] text-white' : 'bg-[#F2F4F7] text-[#98A2B3]')
                    }
                  >
                    {done ? <Check className="size-3.5" strokeWidth={2.5} /> : index + 1}
                  </span>
                  <p
                    className={
                      'max-w-full truncate text-[11px] font-medium ' +
                      (done ? 'text-[#0A0D14]' : 'text-[#98A2B3]')
                    }
                  >
                    {step.label}
                  </p>
                </div>
                {index < escrowSteps.length - 1 && (
                  <span
                    className={'mx-2 h-0.5 flex-1 ' + (index < currentIndex ? 'bg-[#2B59FF]' : 'bg-[#F2F4F7]')}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
