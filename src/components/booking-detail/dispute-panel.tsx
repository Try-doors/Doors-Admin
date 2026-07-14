import { useState } from 'react'
import { AlertTriangle, Clock, FileText } from 'lucide-react'

import type { Booking } from '#/lib/bookings-store'

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function slaRemaining(deadline: string) {
  const diffMs = new Date(deadline).getTime() - Date.now()
  const overdue = diffMs < 0
  const hours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60))
  const label = hours >= 24 ? `${Math.floor(hours / 24)}d ${hours % 24}h` : `${hours}h`
  return { overdue, label }
}

export function DisputePanel({
  booking,
  onResolve,
}: {
  booking: Booking
  onResolve: (resolution: 'release' | 'partial_refund' | 'full_refund', note: string) => void
}) {
  const [note, setNote] = useState('')

  if (!booking.dispute) return null
  const sla = slaRemaining(booking.dispute.slaDeadline)

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#FDA29B] bg-[#FEF3F2] p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-[#DF1C41]" strokeWidth={1.75} />
          <p className="text-[16px] font-medium tracking-[-0.176px] text-[#7A271A]">
            Dispute
          </p>
        </div>
        <div
          className={
            'flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ' +
            (sla.overdue ? 'bg-[#DF1C41] text-white' : 'bg-white text-[#DF1C41]')
          }
        >
          <Clock className="size-3.5" strokeWidth={2} />
          {sla.overdue ? `SLA breached by ${sla.label}` : `${sla.label} left on SLA`}
        </div>
      </div>

      <div>
        <p className="text-[12px] text-[#7A271A]">Reason</p>
        <p className="text-[14px] font-medium text-[#0A0D14]">{booking.dispute.reason}</p>
      </div>

      <div>
        <p className="mb-1.5 text-[12px] text-[#7A271A]">
          Filed by {booking.dispute.filedBy} · SLA deadline {formatDateTime(booking.dispute.slaDeadline)}
        </p>
        <div className="flex flex-wrap gap-2">
          {booking.dispute.evidence.map((file) => (
            <span
              key={file}
              className="flex items-center gap-1.5 rounded-lg border border-[#FDA29B] bg-white px-2.5 py-1.5 text-[12px] text-[#0A0D14]"
            >
              <FileText className="size-3.5 text-[#DF1C41]" strokeWidth={1.75} />
              {file}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#FDA29B] pt-4">
        <p className="text-[13px] font-medium text-[#7A271A]">Resolution</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a resolution note (optional)..."
          rows={2}
          className="w-full resize-none rounded-lg border border-[#FDA29B] bg-white p-2.5 text-[13px] text-[#0A0D14] placeholder:text-[#B54948] focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onResolve('release', note)}
            className="rounded-full bg-[#079455] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#079455]/90"
          >
            Release Funds to Host
          </button>
          <button
            type="button"
            onClick={() => onResolve('partial_refund', note)}
            className="rounded-full border border-[#E2E4E9] bg-white px-4 py-2 text-[13px] font-medium text-[#525866]"
          >
            Partial Refund
          </button>
          <button
            type="button"
            onClick={() => onResolve('full_refund', note)}
            className="rounded-full bg-[#DF1C41] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#DF1C41]/90"
          >
            Full Refund
          </button>
        </div>
      </div>
    </div>
  )
}
