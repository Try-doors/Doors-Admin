export type ProfileTab = 'personal' | 'team' | 'reset'

const tabs: { key: ProfileTab; label: string }[] = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'team', label: 'Team management' },
  { key: 'reset', label: 'Reset Password' },
]

export function ProfileTabs({ tab, onChange }: { tab: ProfileTab; onChange: (tab: ProfileTab) => void }) {
  return (
    <div className="flex gap-4 border-b border-[#F2F4F7]">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={
            'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
            (tab === t.key ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
          }
        >
          {t.label}
          <span className={'h-0.5 w-full ' + (tab === t.key ? 'bg-[#2B59FF]' : 'bg-transparent')} />
        </button>
      ))}
    </div>
  )
}
