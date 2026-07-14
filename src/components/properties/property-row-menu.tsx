import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

type PropertyRowMenuProps = {
  onView: () => void
  onDelete: () => void
}

export function PropertyRowMenu({ onView, onDelete }: PropertyRowMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-lg text-[#31353F] outline-none hover:bg-[#F6F8FA]">
        <MoreHorizontal className="size-5" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[82px]">
        <DropdownMenuItem onSelect={onView} className="text-[12px] text-[#20232D]">
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onDelete}
          className="text-[12px] text-[#DF1C41] focus:text-[#DF1C41]"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
