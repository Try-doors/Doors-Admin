import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import { ViewAllButton } from '#/components/dashboard/filter-chip'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

const palette = ['#93C5FD', '#C4B5FD', '#525866', '#F9A8D4', '#FDBA74']

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

export function TopAgentsCard({ onViewAll }: { onViewAll?: () => void }) {
  const { topHosts } = useDashboardMetrics()

  return (
    <div className="flex h-[408px] w-full shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[348px]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Top Hosts</p>
      </div>
      {topHosts.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No host bookings yet
        </div>
      ) : (
        <div className="flex flex-col">
          {topHosts.map((host, index) => (
            <div
              key={host.name}
              className="flex items-center gap-2 border-b border-[#F6F8FA] px-3 py-2 last:border-b-0"
            >
              <div className="flex flex-1 items-center gap-1.5">
                <Avatar>
                  <AvatarFallback
                    style={{ backgroundColor: palette[index % palette.length] }}
                    className="text-[12px] font-medium text-white"
                  >
                    {initials(host.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="truncate text-[14px] tracking-[-0.084px] text-[#0A0D14]">
                  {host.name}
                </p>
              </div>
              <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
                {host.bookings} booking{host.bookings === 1 ? '' : 's'}
              </p>
            </div>
          ))}
        </div>
      )}
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
