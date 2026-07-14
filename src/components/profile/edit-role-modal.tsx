import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { ProfileModal } from '#/components/profile/profile-modal'
import type { TeamMember, TeamRole } from '#/lib/team-store'

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] bg-[#F6F8FA] p-3 text-[14px] text-[#868C98]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'
const selectClassName =
  'h-auto w-full appearance-none rounded-[10px] border border-[#E2E4E9] bg-white p-3 pr-9 text-[14px] text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'

type EditRoleModalProps = {
  member: TeamMember
  onClose: () => void
  onSave: (role: TeamRole) => void
}

export function EditRoleModal({ member, onClose, onSave }: EditRoleModalProps) {
  const [role, setRole] = useState<TeamRole>(member.role)

  return (
    <ProfileModal title="Edit Role" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Email Address</Label>
          <Input value={member.email} disabled className={inputClassName} />
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Role</Label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as TeamRole)}
              className={selectClassName}
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#868C98]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSave(role)}
          className="w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
        >
          Save Changes
        </button>
      </div>
    </ProfileModal>
  )
}
