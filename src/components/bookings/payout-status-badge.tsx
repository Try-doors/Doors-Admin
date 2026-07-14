import type { PayoutStatus } from '#/lib/bookings-store'

const payoutMeta: Record<PayoutStatus, { label: string; bg: string; text: string }> = {
  not_due: { label: 'Not Due', bg: '#F2F4F7', text: '#475467' },
  queued: { label: 'Queued', bg: '#FEF0C7', text: '#B54708' },
  processing: { label: 'Processing', bg: '#EFF4FF', text: '#2B59FF' },
  processed: { label: 'Processed', bg: '#ECFDF3', text: '#079455' },
  on_hold: { label: 'On Hold', bg: '#FEE4E2', text: '#DF1C41' },
}

export function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  const meta = payoutMeta[status]
  return (
    <span
      className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ backgroundColor: meta.bg, color: meta.text }}
    >
      {meta.label}
    </span>
  )
}
