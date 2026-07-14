import { useState } from 'react'
import { Send } from 'lucide-react'

import { OwnerAvatar } from '#/components/owners/owner-avatar'
import { OwnersPagination } from '#/components/owners/owners-pagination'
import { EditRoleModal } from '#/components/profile/edit-role-modal'
import { InviteMemberModal } from '#/components/profile/invite-member-modal'
import { TeamRoleBadge } from '#/components/profile/team-role-badge'
import { TeamRowMenu } from '#/components/profile/team-row-menu'
import { useTeam, type TeamMember } from '#/lib/team-store'

export function TeamManagementTab({ onSaved }: { onSaved: (message: string) => void }) {
  const { members, inviteMember, updateRole, toggleBlocked, deleteMember } = useTeam()
  const [inviting, setInviting] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          Team management
        </h2>
        <button
          type="button"
          onClick={() => setInviting(true)}
          className="flex items-center gap-1.5 rounded-full bg-[#2B59FF] px-4 py-2 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
        >
          <Send className="size-4" strokeWidth={1.75} />
          Invite Member
        </button>
      </div>

      <div className="rounded-2xl bg-white">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#F6F8FA]">
              <th className="w-[64px] py-3 pl-5">
                <input type="checkbox" className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]" />
              </th>
              <th className="py-3 text-[14px] font-medium text-[#0C111D]">Member</th>
              <th className="py-3 text-[14px] font-medium text-[#0C111D]">Email Address</th>
              <th className="py-3 text-[14px] font-medium text-[#0C111D]">Roles</th>
              <th className="py-3 text-[14px] font-medium text-[#0C111D]">Status</th>
              <th className="w-[80px] py-3 pr-8 text-right text-[14px] font-medium text-[#0C111D]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id} className={index < members.length - 1 ? 'border-b border-[#F6F8FA]' : ''}>
                <td className="py-4 pl-5">
                  <input type="checkbox" className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]" />
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-1.5">
                    <OwnerAvatar name={member.name} color={member.avatarColor} />
                    <p className="max-w-[140px] truncate text-[14px] text-[#31353F]">{member.name}</p>
                  </div>
                </td>
                <td className="py-4 pr-4 text-[14px] text-[#31353F]">{member.email}</td>
                <td className="py-4 pr-4">
                  <TeamRoleBadge role={member.role} />
                </td>
                <td className="py-4 pr-4 text-[14px]">
                  <span className={member.status === 'Active' ? 'text-[#0A0D14]' : 'text-[#868C98]'}>
                    {member.status}
                  </span>
                </td>
                <td className="py-4 pr-6 text-right">
                  <div className="flex justify-end">
                    <TeamRowMenu
                      member={member}
                      onEditRole={() => setEditingMember(member)}
                      onToggleBlocked={() => toggleBlocked(member.id)}
                      onDelete={() => deleteMember(member.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OwnersPagination total={250} />

      {inviting && (
        <InviteMemberModal
          onClose={() => setInviting(false)}
          onSend={(email, role) => {
            inviteMember(email, role)
            setInviting(false)
            onSaved('Invite sent')
          }}
        />
      )}

      {editingMember && (
        <EditRoleModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={(role) => {
            updateRole(editingMember.id, role)
            setEditingMember(null)
            onSaved('Role updated')
          }}
        />
      )}
    </div>
  )
}
