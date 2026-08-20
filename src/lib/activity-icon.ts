import {
  AlertTriangle,
  Bell,
  CalendarPlus,
  CheckCircle2,
  DoorOpen,
  UserCog,
  Wallet,
  XCircle,
  type LucideIcon,
} from 'lucide-react'

export function activityIconFor(description: string): { icon: LucideIcon; bg: string } {
  const text = description.toLowerCase()
  if (text.includes('dispute')) return { icon: AlertTriangle, bg: '#7A271A' }
  if (text.includes('cancel')) return { icon: XCircle, bg: '#525866' }
  if (text.includes('checked in') || text.includes('check-in')) return { icon: DoorOpen, bg: '#134E48' }
  if (
    text.includes('payout') ||
    text.includes('payment') ||
    text.includes('escrow') ||
    text.includes('refund') ||
    text.includes('captured')
  )
    return { icon: Wallet, bg: '#00359E' }
  if (text.includes('approv') || text.includes('confirmed')) return { icon: CheckCircle2, bg: '#079455' }
  if (text.includes('created') || text.includes('booking submitted')) return { icon: CalendarPlus, bg: '#851651' }
  if (text.includes('admin') || text.includes('rejected')) return { icon: UserCog, bg: '#6938EF' }
  return { icon: Bell, bg: '#00359E' }
}
