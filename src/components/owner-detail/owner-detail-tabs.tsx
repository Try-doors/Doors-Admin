export type OwnerDetailTab = 'personal' | 'properties'

type OwnerDetailTabsProps = {
  tab: OwnerDetailTab
  onChange: (tab: OwnerDetailTab) => void
}

export function OwnerDetailTabs({ tab, onChange }: OwnerDetailTabsProps) {
  return (
    <div className="flex gap-4 border-b border-[#F2F4F7]">
      <button
        type="button"
        onClick={() => onChange('personal')}
        className={
          'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
          (tab === 'personal' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
        }
      >
        Personal Info
        <span className={'h-0.5 w-full ' + (tab === 'personal' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
      </button>
      <button
        type="button"
        onClick={() => onChange('properties')}
        className={
          'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
          (tab === 'properties' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
        }
      >
        <span className="flex items-center gap-1.5">
          Properties
          <span className="size-2 rounded-full bg-[#C2D6FF]" />
        </span>
        <span className={'h-0.5 w-full ' + (tab === 'properties' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
      </button>
    </div>
  )
}
