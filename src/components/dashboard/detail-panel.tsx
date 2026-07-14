import type { ReactNode } from 'react'

export function DetailPanel({
  open,
  onClose,
  title,
  headerRight,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  headerRight?: ReactNode
  children: ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-[476px] flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[30px] pt-6 pb-[26px]">
          <p className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">{title}</p>
          {headerRight}
        </div>
        <div className="flex-1 overflow-y-auto px-[30px]">{children}</div>
        <div className="flex h-[88px] shrink-0 items-center px-[30px]">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[10px] bg-[#F6F8FA] py-[10px] text-center text-[14px] font-medium text-[#525866]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
