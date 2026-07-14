import { Cpu, Home, Shield, User } from 'lucide-react'

import type { Booking, TimelineActor } from '#/lib/bookings-store'

const actorMeta: Record<TimelineActor, { label: string; icon: typeof Cpu; bg: string; color: string }> = {
  system: { label: 'System', icon: Cpu, bg: '#F2F4F7', color: '#475467' },
  guest: { label: 'Guest', icon: User, bg: '#EFF4FF', color: '#2B59FF' },
  host: { label: 'Host', icon: Home, bg: '#ECFDF3', color: '#079455' },
  admin: { label: 'Admin', icon: Shield, bg: '#F4F3FF', color: '#6938EF' },
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TimelineCard({ booking }: { booking: Booking }) {
  const events = [...booking.timeline].sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
  )

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0C111D]">
        Timeline &amp; Audit Trail
      </p>
      <div className="flex flex-col">
        {events.map((event, index) => {
          const meta = actorMeta[event.actor]
          const Icon = meta.icon
          return (
            <div key={event.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: meta.bg }}
                >
                  <Icon className="size-3.5" style={{ color: meta.color }} strokeWidth={1.75} />
                </span>
                {index < events.length - 1 && <span className="w-px flex-1 bg-[#F2F4F7]" />}
              </div>
              <div className="flex flex-1 flex-col pb-5">
                <p className="text-[13px] text-[#0A0D14]">{event.description}</p>
                <p className="text-[12px] text-[#868C98]">
                  {meta.label}
                  {event.actorName ? ` · ${event.actorName}` : ''} · {formatDateTime(event.at)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
