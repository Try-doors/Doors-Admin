import { Briefcase, User } from 'lucide-react'

export type UserType = 'Individual' | 'Business'

export function UserTypeBadge({ type }: { type: UserType }) {
  if (type === 'Business') {
    return (
      <div className="flex w-fit items-center gap-0.5 rounded-full bg-[#CAC2FF] py-0.5 pl-0.5 pr-2">
        <Briefcase className="size-4 text-[#2B1664]" strokeWidth={2} />
        <p className="text-[12px] font-medium text-[#2B1664]">Business</p>
      </div>
    )
  }
  return (
    <div className="flex w-fit items-center gap-0.5 rounded-full bg-[#C2EFFF] py-0.5 pl-0.5 pr-2">
      <User className="size-4 text-[#164564]" strokeWidth={2} />
      <p className="text-[12px] font-medium text-[#164564]">Individual</p>
    </div>
  )
}
