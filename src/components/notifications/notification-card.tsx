import { ChevronRight, UserPlus } from 'lucide-react'

import type { NotificationItem } from '#/lib/notifications-store'

export function NotificationCard({
  notification,
  onClick,
}: {
  notification: NotificationItem
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-2.5 rounded-xl border border-[#E2E4E9] bg-white p-4 text-left"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#134E48]">
        <UserPlus className="size-4 text-white" strokeWidth={1.75} />
      </div>
      <div className="flex flex-1 items-center gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.2px] text-[#868C98]">
            {notification.category}
          </p>
          <p className="text-[14px] tracking-[-0.084px] text-[#0A0D14]">{notification.message}</p>
          <p className="text-[12px] text-[#525866]">{notification.time}</p>
        </div>
        <ChevronRight className="size-6 shrink-0 text-[#868C98]" strokeWidth={1.75} />
      </div>
    </button>
  )
}
