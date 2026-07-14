import { Bell, Trash2, UserCheck, UserPlus } from 'lucide-react'

import { ViewAllButton } from '#/components/dashboard/filter-chip'

const activity = [
  { icon: Bell, bg: '#00359E', text: 'Created a new property', time: '15 mins ago' },
  { icon: UserPlus, bg: '#134E48', text: 'Added a new team member', time: '15 mins ago' },
  { icon: UserPlus, bg: '#134E48', text: 'Added a new team member', time: '15 mins ago' },
  { icon: UserCheck, bg: '#851651', text: 'Updated your profile', time: '15 mins ago' },
  { icon: Trash2, bg: '#7A271A', text: 'Deleted a property', time: '15 mins ago' },
]

export function RecentActivityCard({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <div className="flex h-[408px] w-[348px] shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Recent Activity</p>
      <div className="flex flex-col">
        {activity.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex items-start gap-2.5 py-2">
              <div
                className="flex items-center justify-center rounded-full p-2"
                style={{ backgroundColor: item.bg }}
              >
                <Icon className="size-4 text-white" strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 flex-col">
                <p className="text-[12px] font-medium text-[#0A0D14]">{item.text}</p>
                <p className="text-[12px] text-[#525866]">{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
