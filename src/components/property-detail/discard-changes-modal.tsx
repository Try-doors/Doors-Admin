import { Info } from 'lucide-react'

export function DiscardChangesModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-5 rounded-3xl bg-white p-8">
        <div className="flex items-center justify-center rounded-full bg-[#EFF4FF] p-3">
          <Info className="size-8 text-[#2B59FF]" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">
            Discard Changes
          </p>
          <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
            Are your sure you want to proceed with this action
          </p>
        </div>
        <div className="flex w-full items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[#E2E4E9] bg-white px-6 py-3 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  )
}
