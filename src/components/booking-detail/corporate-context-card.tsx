import { CheckCircle2, XCircle } from 'lucide-react'

import type { Booking } from '#/lib/bookings-store'

const invoiceMeta: Record<string, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pending', bg: '#FEF0C7', text: '#B54708' },
  issued: { label: 'Issued', bg: '#EFF4FF', text: '#2B59FF' },
  paid: { label: 'Paid', bg: '#ECFDF3', text: '#079455' },
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-[#868C98]">{label}</p>
      <p className="text-[14px] font-medium text-[#0A0D14]">{value}</p>
    </div>
  )
}

export function CorporateContextCard({ booking }: { booking: Booking }) {
  if (!booking.corporate) return null
  const invoice = invoiceMeta[booking.corporate.invoiceStatus]

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0C111D]">
        Corporate Context
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Company" value={booking.corporate.company} />
        <Field label="Approver" value={booking.corporate.approver} />
        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">Invoice Status</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.22px]"
            style={{ backgroundColor: invoice.bg, color: invoice.text }}
          >
            {invoice.label}
          </span>
        </div>
        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">Policy Compliance</p>
          {booking.corporate.policyCompliant ? (
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#079455]">
              <CheckCircle2 className="size-4" strokeWidth={1.75} />
              Within policy
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#DF1C41]">
              <XCircle className="size-4" strokeWidth={1.75} />
              Out of policy
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
