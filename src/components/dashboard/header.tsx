import { Link } from '@tanstack/react-router'
import { Bell, ChevronDown, CircleHelp, Search } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { useNotifications } from '#/lib/notifications-store'
import { initials, useProfile } from '#/lib/profile-store'

export function Header() {
  const { profile } = useProfile()
  const { unreadCount } = useNotifications()

  return (
    <header className="sticky top-0 z-10 flex h-[72px] items-center justify-between border-b border-[#F6F8FA] bg-white px-8">
      <div className="flex w-[273px] items-center gap-2 rounded-lg bg-[#F6F8FA] p-3">
        <Search className="size-5 text-[#525866]" strokeWidth={1.75} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-[14px] text-[#525866] tracking-[-0.084px] placeholder:text-[#525866] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-[14px]">
        <button
          type="button"
          className="flex h-8 items-center justify-center gap-1 rounded-full bg-[#F6F8FA] px-[10px] text-[12px] font-medium text-[#31353F]"
        >
          <CircleHelp className="size-5" strokeWidth={1.75} />
          Need Help
        </button>
        <Link to="/notifications" className="relative flex size-8 items-center justify-center text-[#31353F]">
          <Bell className="size-5" strokeWidth={1.75} />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 size-2 rounded-full bg-[#DF1C41]" />
          )}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <div
              className="flex size-8 items-center justify-center rounded-full text-[12px] font-medium text-white"
              style={{ backgroundColor: profile.avatarColor }}
            >
              {initials(profile.name)}
            </div>
            <ChevronDown className="size-4 text-[#31353F]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/profile" search={{ tab: 'personal' }} className="no-underline">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" search={{ tab: 'team' }} className="no-underline">
                Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile" search={{ tab: 'reset' }} className="no-underline">
                Reset Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/sign-in" className="!text-[#DF1C41] no-underline">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
