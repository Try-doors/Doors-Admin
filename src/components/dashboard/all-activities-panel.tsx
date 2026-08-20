import { useMemo, useState } from 'react'
import { ChevronDown, Search, UserRound } from 'lucide-react'

import { CircleAvatar } from '#/components/dashboard/circle-avatar'
import { DetailPanel } from '#/components/dashboard/detail-panel'
import { PanelFilterDropdown } from '#/components/dashboard/panel-filter-dropdown'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { activityIconFor } from '#/lib/activity-icon'
import { useBookings, type Booking, type TimelineEvent } from '#/lib/bookings-store'

const palette = ['#93C5FD', '#A5B4FC', '#FCA5A5', '#67E8F9', '#F9A8D4', '#86EFAC', '#FDBA74', '#C4B5FD']

function colorFor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return palette[hash % palette.length]
}

function actorDisplayName(event: TimelineEvent, booking: Booking) {
  if (event.actor === 'admin') return event.actorName ?? 'Admin'
  if (event.actor === 'guest') return booking.guestName
  if (event.actor === 'host') return booking.isDoorsManaged ? 'Doors' : booking.hostName
  return 'System'
}

function dayLabel(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const diffDays = Math.round((startOfDay(now) - startOfDay(date)) / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function withinRange(iso: string, range: string) {
  if (range === 'All Time') return true
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = diffMs / 86400000
  if (range === 'Today') return days <= 1
  if (range === '1 Week') return days <= 7
  if (range === '2 Week') return days <= 14
  if (range === 'Last Month') return days <= 31
  return true
}

function AdminFilterDropdown({
  admins,
  selected,
  onSelect,
}: {
  admins: { name: string; color: string }[]
  selected: string | null
  onSelect: (name: string | null) => void
}) {
  const [search, setSearch] = useState('')
  const selectedAdmin = admins.find((admin) => admin.name === selected)
  const filtered = admins.filter((admin) => admin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-[#31353F] bg-white p-1.5 text-[12px] font-normal text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
        >
          {selectedAdmin ? (
            <CircleAvatar name={selectedAdmin.name} color={selectedAdmin.color} size={20} />
          ) : (
            <UserRound className="size-5 text-[#525866]" strokeWidth={1.75} />
          )}
          <span className="px-0.5">{selectedAdmin ? selectedAdmin.name : 'Filter by Admin'}</span>
          <ChevronDown className="size-5" strokeWidth={1.75} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[154px] gap-2 rounded-lg p-2.5">
        <p className="px-1 pb-2 text-[12px] font-semibold text-[#20232D]">Select Admin</p>
        <div className="mb-1 flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] px-3 py-2 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
          <Search className="size-5 shrink-0 text-[#868C98]" strokeWidth={1.75} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full text-[14px] text-[#0A0D14] outline-none placeholder:text-[#868C98]"
          />
        </div>
        {admins.length === 0 && <p className="px-1 py-1 text-[12px] text-[#868C98]">No admin actions yet</p>}
        {filtered.map((admin) => (
          <DropdownMenuItem
            key={admin.name}
            onSelect={() => onSelect(admin.name)}
            className="gap-1.5 py-1 text-[12px] text-[#0A0D14]"
          >
            <CircleAvatar name={admin.name} color={admin.color} size={20} />
            {admin.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AllActivitiesPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { bookings } = useBookings()
  const [dateFilter, setDateFilter] = useState('All Time')
  const [admin, setAdmin] = useState<string | null>(null)

  const allEvents = useMemo(
    () =>
      bookings
        .flatMap((b) => b.timeline.map((event) => ({ event, booking: b })))
        .sort((a, b) => new Date(b.event.at).getTime() - new Date(a.event.at).getTime()),
    [bookings],
  )

  const admins = useMemo(() => {
    const seen = new Map<string, string>()
    for (const { event } of allEvents) {
      if (event.actor === 'admin' && event.actorName && !seen.has(event.actorName)) {
        seen.set(event.actorName, colorFor(event.actorName))
      }
    }
    return Array.from(seen.entries()).map(([name, color]) => ({ name, color }))
  }, [allEvents])

  const filtered = allEvents.filter(({ event }) => {
    if (!withinRange(event.at, dateFilter)) return false
    if (admin && !(event.actor === 'admin' && event.actorName === admin)) return false
    return true
  })

  const groups: { label: string; items: typeof filtered }[] = []
  for (const entry of filtered) {
    const label = dayLabel(entry.event.at)
    const group = groups.find((g) => g.label === label)
    if (group) group.items.push(entry)
    else groups.push({ label, items: [entry] })
  }

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="All Activities"
      headerRight={
        <div className="flex items-center gap-2">
          <AdminFilterDropdown admins={admins} selected={admin} onSelect={setAdmin} />
          <PanelFilterDropdown
            label={dateFilter}
            options={['All Time', 'Today', '1 Week', '2 Week', 'Last Month']}
            onSelect={setDateFilter}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-2">
            <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
              {group.label}
            </p>
            <div className="flex flex-col">
              {group.items.map(({ event, booking }) => {
                const { icon: Icon, bg } = activityIconFor(event.description)
                const person = actorDisplayName(event, booking)
                return (
                  <div
                    key={`${booking.id}-${event.id}`}
                    className="flex items-start gap-2.5 border-b border-[#F9FAFB] pt-3 pb-2 last:border-b-0"
                  >
                    <div
                      className="flex items-center justify-center rounded-full p-2"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="size-4 text-white" strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]">
                        {booking.reference} · {event.description}
                      </p>
                      <p className="text-[12px] text-[#525866]">
                        {new Date(event.at).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                      <div className="flex items-center gap-1.5 py-2">
                        <CircleAvatar name={person} color={colorFor(person)} size={20} />
                        <p className="text-[12px] text-[#0A0D14]">{person}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="py-8 text-center text-[14px] text-[#525866]">
            No activity found for this filter.
          </p>
        )}
      </div>
    </DetailPanel>
  )
}
