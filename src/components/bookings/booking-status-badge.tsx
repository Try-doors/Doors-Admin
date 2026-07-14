import type { BookingStatus } from '#/lib/bookings-store'

const statusMeta: Record<BookingStatus, { label: string; bg: string; text: string }> = {
  DRAFT: { label: 'Draft', bg: '#F2F4F7', text: '#475467' },
  HELD: { label: 'Held', bg: '#FEF0C7', text: '#B54708' },
  PENDING_APPROVAL: { label: 'Pending Approval', bg: '#FFEAD5', text: '#C4320A' },
  CONFIRMED: { label: 'Confirmed', bg: '#EFF4FF', text: '#2B59FF' },
  MODIFIED: { label: 'Modified', bg: '#F4F3FF', text: '#6938EF' },
  CHECKED_IN: { label: 'Checked In', bg: '#C2EFFF', text: '#164564' },
  COMPLETED: { label: 'Completed', bg: '#ECFDF3', text: '#079455' },
  CANCELLED: { label: 'Cancelled', bg: '#F2F4F7', text: '#475467' },
  DISPUTED: { label: 'Disputed', bg: '#FEE4E2', text: '#DF1C41' },
  EXPIRED: { label: 'Expired', bg: '#F2F4F7', text: '#98A2B3' },
  FAILED: { label: 'Failed', bg: '#FEE4E2', text: '#DF1C41' },
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const meta = statusMeta[status]
  return (
    <span
      className="whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22px]"
      style={{ backgroundColor: meta.bg, color: meta.text }}
    >
      {meta.label}
    </span>
  )
}
