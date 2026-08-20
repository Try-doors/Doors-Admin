import { activityIconFor } from '#/lib/activity-icon'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'
import { ViewAllButton } from '#/components/dashboard/filter-chip'

function relativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`
  const months = Math.round(days / 30)
  return `${months} month${months === 1 ? '' : 's'} ago`
}

export function RecentActivityCard({ onViewAll }: { onViewAll?: () => void }) {
  const { recentActivity } = useDashboardMetrics()

  return (
    <div className="flex h-[408px] w-full shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[348px]">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Recent Activity</p>
      {recentActivity.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No activity yet
        </div>
      ) : (
        <div className="flex flex-col">
          {recentActivity.map((item) => {
            const { icon: Icon, bg } = activityIconFor(item.description)
            return (
              <div key={`${item.bookingId}-${item.id}`} className="flex items-start gap-2.5 py-2">
                <div
                  className="flex items-center justify-center rounded-full p-2"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="size-4 text-white" strokeWidth={1.75} />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-[12px] font-medium text-[#0A0D14]">
                    {item.reference} · {item.description}
                  </p>
                  <p className="text-[12px] text-[#525866]">{relativeTime(item.at)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
