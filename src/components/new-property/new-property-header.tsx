import { X } from 'lucide-react'

export function NewPropertyHeader({ onClose }: { onClose: () => void }) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#F6F8FA] px-8">
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-1.5 text-[12px] font-medium text-[#31353F]"
      >
        <X className="size-5" strokeWidth={1.75} />
        Close
      </button>
      <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0C111D]">New Property</p>
      <div className="flex size-8 items-center justify-center rounded-full bg-[#2B59FF] text-[12px] font-medium text-white">
        JD
      </div>
    </header>
  )
}
