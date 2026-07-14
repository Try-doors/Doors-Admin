import { createFileRoute } from '@tanstack/react-router'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { NotificationCard } from '#/components/notifications/notification-card'
import { NotificationsEmptyState } from '#/components/notifications/notifications-empty-state'
import { useNotifications } from '#/lib/notifications-store'

export const Route = createFileRoute('/notifications')({ component: NotificationsPage })

function NotificationsPage() {
  const { notifications, markAllRead, markRead } = useNotifications()

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-[539px] max-w-full flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
            Notifications
          </h1>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="rounded-lg border border-[#E2E4E9] bg-white px-2.5 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <NotificationsEmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => markRead(notification.id)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
