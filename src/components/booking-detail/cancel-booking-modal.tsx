import { useState } from 'react'
import { XCircle } from 'lucide-react'

export function CancelBookingModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: (reason: string) => void
}) {
  const [reason, setReason] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-5 rounded-3xl bg-white p-8">
        <div className="flex items-center justify-center rounded-full bg-[#FEF3F2] p-3">
          <XCircle className="size-8 text-[#DF1C41]" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">
            Cancel Booking
          </p>
          <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
            This will cancel the booking and notify the guest and host. Please record a reason.
          </p>
        </div>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for cancellation..."
          rows={3}
          autoFocus
          className="w-full resize-none rounded-xl border border-[#E2E4E9] p-3 text-[14px] text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98] focus:outline-none"
        />
        <div className="flex w-full items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#E2E4E9] bg-white px-6 py-3 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!reason.trim()}
            onClick={() => onConfirm(reason.trim())}
            className="flex-1 rounded-full bg-[#DF1C41] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(233,53,53,0.08)] hover:bg-[#DF1C41]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  )
}
