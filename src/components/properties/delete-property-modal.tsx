import { Trash2 } from 'lucide-react'

export function DeletePropertyModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="flex w-full max-w-[440px] flex-col items-center gap-5 rounded-3xl bg-white p-8">
        <div className="flex items-center justify-center rounded-full bg-[#FEF3F2] p-3">
          <Trash2 className="size-8 text-[#DF1C41]" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">
            Delete Property
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
            className="flex-1 rounded-full bg-[#DF1C41] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(233,53,53,0.08)] hover:bg-[#DF1C41]/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
