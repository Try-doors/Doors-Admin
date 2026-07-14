import { Plus } from 'lucide-react'

import ownersEmptyIllustration from '#/assets/owners-empty-state.svg'

export function OwnersEmptyState({ onNewOwner }: { onNewOwner: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <img src={ownersEmptyIllustration} alt="" className="h-[92px] w-[123px]" />
      <div className="flex flex-col items-center gap-0.5 text-center">
        <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          No Property Owner Yet
        </p>
        <p className="text-[14px] tracking-[-0.084px] text-[#31353F]">Check back later</p>
      </div>
      <button
        type="button"
        onClick={onNewOwner}
        className="flex items-center gap-1 rounded-full bg-[#2B59FF] px-4 py-2 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
      >
        <Plus className="size-5" strokeWidth={2} />
        New Owner
      </button>
    </div>
  )
}
