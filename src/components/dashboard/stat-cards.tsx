import { ArrowUpRight, Bell } from 'lucide-react'

type Stat = {
  label: string
  value: string
  trend: string
  direction: 'up' | 'down'
}

const stats: Stat[] = [
  { label: 'Total Revenue', value: '$400,000', trend: '16.34%', direction: 'down' },
  { label: 'Total Properties', value: '548', trend: '22.9%', direction: 'up' },
  { label: 'Total Users', value: '54,880', trend: '22.9%', direction: 'up' },
  { label: 'Total Owners', value: '548', trend: '22.9%', direction: 'up' },
  { label: 'Total Application', value: '240,500', trend: '22.9%', direction: 'up' },
]

export function StatCards() {
  return (
    <div className="flex flex-wrap gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-[120px] w-full flex-col justify-center gap-3 rounded-lg border border-[#E2E4E9] bg-white p-4 sm:w-[256px]"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex items-center justify-center rounded-full bg-[#F5F8FF] p-1">
              <Bell className="size-3 text-[#2B59FF]" strokeWidth={2} />
            </div>
            <p className="text-[12px] text-[#525866]">{stat.label}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[24px] font-bold leading-8 text-[#0A0D14]">{stat.value}</p>
            <div className="flex h-[19px] items-center gap-[3px]">
              {stat.direction === 'up' ? (
                <ArrowUpRight className="size-4 text-[#079455]" strokeWidth={2} />
              ) : (
                <ArrowUpRight className="size-4 rotate-90 text-[#DF1C41]" strokeWidth={2} />
              )}
              <p className="text-[12px] text-[#525866]">{stat.trend}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
