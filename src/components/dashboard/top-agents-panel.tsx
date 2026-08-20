import { CircleAvatar } from '#/components/dashboard/circle-avatar'
import { DetailPanel } from '#/components/dashboard/detail-panel'
import { useBookings } from '#/lib/bookings-store'

const palette = ['#C4B5FD', '#F9A8D4', '#93C5FD', '#86EFAC', '#525866', '#FDBA74', '#FCA5A5', '#A5B4FC', '#67E8F9', '#FDE68A']

export function TopAgentsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { bookings } = useBookings()

  const hostStats = new Map<string, number>()
  for (const b of bookings) {
    if (b.isDoorsManaged) continue
    hostStats.set(b.hostName, (hostStats.get(b.hostName) ?? 0) + 1)
  }
  const owners = Array.from(hostStats.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return (
    <DetailPanel open={open} onClose={onClose} title="Top Hosts">
      {owners.length === 0 ? (
        <p className="py-8 text-center text-[14px] text-[#525866]">No host bookings yet.</p>
      ) : (
        <div className="flex flex-col">
          {owners.map((owner, index) => (
            <div
              key={owner.name}
              className="flex items-center gap-2 border-b border-[#F6F8FA] px-3 py-2 last:border-b-0"
            >
              <div className="flex flex-1 items-center gap-1.5">
                <CircleAvatar name={owner.name} color={palette[index % palette.length]} size={32} />
                <p className="truncate text-[14px] tracking-[-0.084px] text-[#0A0D14]">
                  {owner.name}
                </p>
              </div>
              <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
                {owner.count} booking{owner.count === 1 ? '' : 's'}
              </p>
            </div>
          ))}
        </div>
      )}
    </DetailPanel>
  )
}
