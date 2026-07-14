import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

export function PanelFilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string
  options: string[]
  onSelect: (option: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-0.5 rounded-lg border border-[#E2E4E9] bg-white p-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
        >
          <span className="px-1">{label}</span>
          <ChevronDown className="size-5" strokeWidth={1.75} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[94px] rounded-lg p-2.5">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => onSelect(option)}
            className={`justify-center text-[12px] font-medium ${
              option === label ? 'text-[#155EEF]' : 'text-[#20232D]'
            }`}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
