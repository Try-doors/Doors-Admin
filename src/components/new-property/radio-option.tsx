type RadioOptionProps = {
  label: string
  selected: boolean
  onSelect: () => void
}

export function RadioOption({ label, selected, onSelect }: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-[164px] items-center gap-2 text-left"
    >
      <span
        className={
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 ' +
          (selected ? 'border-[#2B59FF]' : 'border-[#E2E4E9]')
        }
      >
        {selected && <span className="size-2.5 rounded-full bg-[#2B59FF]" />}
      </span>
      <span className="text-[14px] tracking-[-0.084px] text-[#0A0D14]">{label}</span>
    </button>
  )
}
