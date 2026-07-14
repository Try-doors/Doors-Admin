import { Minus, Plus, type LucideIcon } from 'lucide-react'

type CounterFieldProps = {
  icon: LucideIcon
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
}

export function CounterField({ icon: Icon, label, value, onChange, min = 0 }: CounterFieldProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="size-6 text-[#0A0D14]" strokeWidth={1.5} />
        <p className="text-[16px] tracking-[-0.176px] text-[#0A0D14]">{label}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex items-center justify-center rounded-full border border-[#E2E4E9] bg-white p-1.5 shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
        >
          <Minus className="size-5 text-[#0A0D14]" strokeWidth={1.75} />
        </button>
        <p className="w-4 text-center text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          {value}
        </p>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="flex items-center justify-center rounded-full border border-[#E2E4E9] bg-white p-1.5 shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
        >
          <Plus className="size-5 text-[#0A0D14]" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}
