import { createContext, use, useState, type ReactNode } from 'react'

export type NotificationItem = {
  id: string
  category: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    category: 'Rental Agreement Signed',
    message: 'The rental agreement for [Property Name] has been signed',
    time: '15 mins ago',
    read: false,
  },
  {
    id: '2',
    category: 'New Property Listing Pending Approval',
    message: 'A new property has been submitted by [Agent Name] for renting/selling. Please review the listing',
    time: '15 mins ago',
    read: false,
  },
  {
    id: '3',
    category: 'New Offer Received for [Property Name]',
    message:
      'A new offer has been made for [Property Name] by [Buyer Name]. Review the offer and assign it to the appropriate agent.',
    time: '15 mins ago',
    read: false,
  },
  {
    id: '4',
    category: 'New Agent Registered',
    message:
      '[Agent Name] has been successfully onboarded. Review their profile and assign properties for listing or management.',
    time: '15 mins ago',
    read: false,
  },
]

type NotificationsContextValue = {
  notifications: NotificationItem[]
  unreadCount: number
  markAllRead: () => void
  markRead: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <NotificationsContext value={{ notifications, unreadCount, markAllRead, markRead }}>
      {children}
    </NotificationsContext>
  )
}

export function useNotifications() {
  const context = use(NotificationsContext)
  if (!context) throw new Error('useNotifications must be used within a NotificationsProvider')
  return context
}
