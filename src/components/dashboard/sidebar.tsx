import { Link, useRouterState } from '@tanstack/react-router'
import { Building2, CalendarCheck, Crown, House, User, Users, X } from 'lucide-react'

import doorsLogoMark from '#/assets/doors-logo-mark.svg'

const linkedItems = [
  { label: 'Dashboard', href: '/dashboard', icon: House },
  { label: 'Bookings', href: '/bookings', icon: CalendarCheck },
  { label: 'Owners', href: '/owners', icon: Crown },
  { label: 'Properties', href: '/properties', icon: Building2 },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Profile', href: '/profile', icon: User },
] as const

const placeholderItems: { label: string; href: string; icon: typeof House }[] = []

const activeClassName = 'bg-[#F6F8FA] font-medium !text-[#0C111D]'
const inactiveClassName = 'font-normal !text-[#31353F] hover:bg-[#F6F8FA]'
const baseClassName =
  'flex items-center gap-2 rounded-lg px-[10px] py-[7px] text-[14px] tracking-[-0.084px] no-underline'

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={
          'fixed left-0 top-0 z-50 h-screen w-[240px] shrink-0 border-r border-[#E2E4E9] bg-white transition-transform duration-200 md:translate-x-0 ' +
          (open ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex h-[72px] items-center justify-between px-[26px]">
          <div className="flex items-center">
            <img src={doorsLogoMark} alt="" className="h-[17px] w-[17px]" />
            <p className="ml-[4.66px] text-[19px] font-semibold tracking-[-0.77px] text-black">
              doors
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-[#31353F] md:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        <nav className="flex flex-col gap-2 px-4">
          {linkedItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={`${baseClassName} ${isActive ? activeClassName : inactiveClassName}`}
              >
                <Icon className="size-5" strokeWidth={1.75} />
                {item.label}
              </Link>
            )
          })}
          {placeholderItems.map((item) => {
            const Icon = item.icon
            return (
              <a key={item.label} href={item.href} className={`${baseClassName} ${inactiveClassName}`}>
                <Icon className="size-5" strokeWidth={1.75} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
