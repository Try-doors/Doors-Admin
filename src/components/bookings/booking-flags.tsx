import { useState } from 'react'
import { AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react'

import type { Booking } from '#/lib/bookings-store'

function FlagIcon({
  icon: Icon,
  label,
  bg,
  color,
}: {
  icon: typeof AlertTriangle
  label: string
  bg: string
  color: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <span
      className="relative flex size-6 items-center justify-center rounded-full"
      style={{ backgroundColor: bg }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon className="size-3.5" style={{ color }} strokeWidth={2} />
      {hover && (
        <span className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#20232D] px-2.5 py-1 text-[12px] font-normal text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12)]">
          {label}
        </span>
      )}
    </span>
  )
}

export function BookingFlags({ booking }: { booking: Booking }) {
  const { disputed, outOfPolicy, firstTimeGuest } = booking.flags
  if (!disputed && !outOfPolicy && !firstTimeGuest) {
    return <span className="text-[12px] text-[#CDD0D5]">—</span>
  }
  return (
    <div className="flex items-center gap-1.5">
      {disputed && (
        <FlagIcon icon={AlertTriangle} label="Disputed" bg="#FEE4E2" color="#DF1C41" />
      )}
      {outOfPolicy && (
        <FlagIcon icon={ShieldAlert} label="Out of policy" bg="#FFEAD5" color="#C4320A" />
      )}
      {firstTimeGuest && (
        <FlagIcon icon={Sparkles} label="First-time guest" bg="#EFF4FF" color="#2B59FF" />
      )}
    </div>
  )
}
