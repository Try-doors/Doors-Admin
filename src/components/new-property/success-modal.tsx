import { PartyPopper } from 'lucide-react'

export function SuccessModal({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="mx-4 flex w-full max-w-[400px] flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[#FFF1E7]">
          <PartyPopper className="size-8 text-[#F97316]" strokeWidth={1.75} />
        </div>
        <h2 className="text-[20px] font-semibold tracking-[-0.5px] text-[#0C111D]">
          Successfully Published
        </h2>
        <p className="text-[14px] text-[#525866]">
          We are currently reviewing your information at this time. it would take a 24 hours
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
