import { ChevronDown } from 'lucide-react'

export function FilterChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center gap-0.5 rounded-lg border border-[#E2E4E9] bg-white p-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
    >
      <span className="px-1">{label}</span>
      <ChevronDown className="size-5" strokeWidth={1.75} />
    </button>
  )
}

export function ViewAllButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-lg border border-[#E2E4E9] bg-white p-2 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
    >
      View All
    </button>
  )
}
