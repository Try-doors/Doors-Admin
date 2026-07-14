import type { TeamRole } from '#/lib/team-store'

export function TeamRoleBadge({ role }: { role: TeamRole }) {
  if (role === 'Admin') {
    return (
      <div className="flex w-fit items-center gap-1.5 rounded-full bg-[#FEF0C7] px-2.5 py-1">
        <span className="size-1.5 rounded-full bg-[#F79009]" />
        <p className="text-[12px] font-medium text-[#93370D]">Admin</p>
      </div>
    )
  }
  return (
    <div className="flex w-fit items-center gap-1.5 rounded-full bg-[#EBE9FE] px-2.5 py-1">
      <span className="size-1.5 rounded-full bg-[#7A5AF8]" />
      <p className="text-[12px] font-medium text-[#5720B7]">Member</p>
    </div>
  )
}
