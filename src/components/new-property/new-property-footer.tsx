import { ArrowRight, ChevronLeft } from 'lucide-react'

type NewPropertyFooterProps = {
  onBack: () => void
  onSaveExit: () => void
  onContinue: () => void
  continueLabel?: string
  continueDisabled?: boolean
}

export function NewPropertyFooter({
  onBack,
  onSaveExit,
  onContinue,
  continueLabel = 'Save & Continue',
  continueDisabled,
}: NewPropertyFooterProps) {
  return (
    <footer className="flex h-[88px] items-center justify-between border-t border-[#F6F8FA] px-11">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 rounded-full border border-[#E2E4E9] bg-white px-5 py-2.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
        Back
      </button>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSaveExit}
          className="rounded-full bg-[#D5DEFF] px-5 py-2.5 text-[14px] font-medium text-[#2B59FF] hover:bg-[#D5DEFF]/80"
        >
          Save &amp; Exit
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className="flex items-center gap-1 rounded-full bg-[#2B59FF] px-5 py-2.5 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {continueLabel}
          <ArrowRight className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    </footer>
  )
}
