import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

export type UserRowAction = {
  label: string
  onSelect: () => void
  danger?: boolean
}

export function UserRowMenu({ actions }: { actions: UserRowAction[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-lg text-[#31353F] outline-none hover:bg-[#F6F8FA]">
        <MoreHorizontal className="size-5" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[110px]">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onSelect={action.onSelect}
            className={'text-[12px] ' + (action.danger ? 'text-[#DF1C41] focus:text-[#DF1C41]' : 'text-[#20232D]')}
          >
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
