import { CheckCircle2, X } from 'lucide-react'

export function SuccessToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-[#17B26A] px-4 py-2.5 text-white">
      <CheckCircle2 className="size-4 shrink-0" strokeWidth={2} />
      <p className="text-[14px] font-medium">{message}</p>
      <button type="button" onClick={onDismiss} className="ml-2 shrink-0">
        <X className="size-4" strokeWidth={2} />
      </button>
    </div>
  )
}
