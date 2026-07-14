import { AlertTriangle, CalendarClock, ListChecks, Wallet } from 'lucide-react'

import { useBookings } from '#/lib/bookings-store'

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}

export function BookingMetricCards() {
  const { bookings, needsActionBookings } = useBookings()

  const disputedCount = bookings.filter((b) => b.status === 'DISPUTED').length
  const queuedPayouts = bookings.filter((b) => b.payoutStatus === 'queued')
  const queuedPayoutTotal = queuedPayouts.reduce(
    (sum, b) => sum + b.grossAmount * (1 - b.commissionRate),
    0,
  )

  const cards = [
    {
      label: 'Total Bookings',
      value: String(bookings.length),
      icon: CalendarClock,
      iconColor: '#2B59FF',
      iconBg: '#F5F8FF',
    },
    {
      label: 'Needs Action',
      value: String(needsActionBookings.length),
      icon: ListChecks,
      iconColor: '#C4320A',
      iconBg: '#FFEAD5',
    },
    {
      label: 'Disputed',
      value: String(disputedCount),
      icon: AlertTriangle,
      iconColor: '#DF1C41',
      iconBg: '#FEE4E2',
    },
    {
      label: 'Payouts Queued',
      value: formatNaira(queuedPayoutTotal),
      icon: Wallet,
      iconColor: '#079455',
      iconBg: '#ECFDF3',
    },
  ]

  return (
    <div className="flex flex-wrap gap-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex h-[100px] w-full flex-col justify-center gap-3 rounded-lg border border-[#E2E4E9] bg-white p-4 sm:w-[256px]"
        >
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center justify-center rounded-full p-1"
              style={{ backgroundColor: card.iconBg }}
            >
              <card.icon className="size-3" style={{ color: card.iconColor }} strokeWidth={2} />
            </div>
            <p className="text-[12px] text-[#525866]">{card.label}</p>
          </div>
          <p className="text-[22px] font-bold leading-8 text-[#0A0D14]">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
