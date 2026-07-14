import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function ProfileModal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">{title}</h2>
          <button type="button" onClick={onClose} className="text-[#525866] hover:text-[#0A0D14]">
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
