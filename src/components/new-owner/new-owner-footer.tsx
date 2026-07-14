import { ArrowRight } from 'lucide-react'

type NewOwnerFooterProps = {
  onCancel: () => void
  onPrimary: () => void
  primaryLabel: string
  primaryDisabled?: boolean
  showArrow?: boolean
}

export function NewOwnerFooter({
  onCancel,
  onPrimary,
  primaryLabel,
  primaryDisabled,
  showArrow,
}: NewOwnerFooterProps) {
  return (
    <footer className="flex h-[88px] items-center justify-end gap-4 border-t border-[#F6F8FA] px-11">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full border border-[#E2E4E9] bg-white px-5 py-2.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onPrimary}
        disabled={primaryDisabled}
        className="flex items-center gap-1 rounded-full bg-[#2B59FF] px-5 py-2.5 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {primaryLabel}
        {showArrow && <ArrowRight className="size-5" strokeWidth={1.75} />}
      </button>
    </footer>
  )
}
