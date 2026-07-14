import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { TeamMember } from '#/lib/team-store'

type TeamRowMenuProps = {
  member: TeamMember
  onEditRole: () => void
  onToggleBlocked: () => void
  onDelete: () => void
}

export function TeamRowMenu({ member, onEditRole, onToggleBlocked, onDelete }: TeamRowMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-8 items-center justify-center rounded-lg text-[#31353F] outline-none hover:bg-[#F6F8FA]">
        <MoreHorizontal className="size-5" strokeWidth={1.75} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px]">
        <DropdownMenuItem onSelect={onEditRole} className="text-[12px] text-[#20232D]">
          Edit Role
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onToggleBlocked} className="text-[12px] text-[#20232D]">
          {member.status === 'Active' ? 'Block User' : 'Unblock User'}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDelete} className="text-[12px] text-[#DF1C41] focus:text-[#DF1C41]">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
