import { createContext, use, useState, type ReactNode } from 'react'

export type PlatformUser = {
  id: string
  name: string
  avatarColor: string
  email: string
  phone: string
  flag: string
  country: string
  lastLogin: string
}

const initialActiveUsers: PlatformUser[] = [
  { id: '1', name: 'John Doe', avatarColor: '#64748B', email: 'michelle.rivera@example.com', phone: '(808) 555-0111', flag: '🇳🇬', country: 'Nigeria', lastLogin: '19 Nov. 23' },
  { id: '2', name: 'Jenny Wilson', avatarColor: '#D1BAA9', email: 'jackson.graham@example.com', phone: '(629) 555-0129', flag: '🇳🇬', country: 'Nigeria', lastLogin: '19 Nov. 23' },
  { id: '3', name: 'Cody Fisher', avatarColor: '#ABB677', email: 'michael.mitc@example.com', phone: '(808) 555-0111', flag: '🇳🇬', country: 'Nigeria', lastLogin: '19 Nov. 23' },
  { id: '4', name: 'Ronald Richards', avatarColor: '#94A3B8', email: 'alma.lawson@example.com', phone: '(406) 555-0120', flag: '🇬🇧', country: 'United Kingdom', lastLogin: '19 Nov. 23' },
  { id: '5', name: 'Jane Cooper', avatarColor: '#C3C7DF', email: 'jessica.hanson@example.com', phone: '(209) 555-0104', flag: '🇬🇧', country: 'United Kingdom', lastLogin: '19 Nov. 23' },
  { id: '6', name: 'Esther Howard', avatarColor: '#D1BAA9', email: 'dolores.chambers@example.com', phone: '(405) 555-0128', flag: '🇫🇷', country: 'France', lastLogin: '19 Nov. 23' },
  { id: '7', name: 'Robert Fox', avatarColor: '#D2B1AC', email: 'felicia.reid@example.com', phone: '(603) 555-0123', flag: '🇬🇧', country: 'United Kingdom', lastLogin: '19 Nov. 23' },
  { id: '8', name: 'Cameron Williamson', avatarColor: '#9CA3AF', email: 'kenzi.lawson@example.com', phone: '(208) 555-0112', flag: '🇺🇸', country: 'USA', lastLogin: '19 Nov. 23' },
  { id: '9', name: 'Savannah Nguyen', avatarColor: '#A9B58D', email: 'bill.sanders@example.com', phone: '(702) 555-0122', flag: '🇺🇸', country: 'USA', lastLogin: '19 Nov. 23' },
  { id: '10', name: 'Jerome Bell', avatarColor: '#B8A9D1', email: 'willie.jennings@example.com', phone: '(205) 555-0100', flag: '🇧🇪', country: 'Belgium', lastLogin: '19 Nov. 23' },
  { id: '11', name: 'Leslie Alexander', avatarColor: '#D2DBBD', email: 'nevaeh.simmons@example.com', phone: '(270) 555-0117', flag: '🇧🇪', country: 'Belgium', lastLogin: '19 Nov. 23' },
]

const initialArchivedUsers: PlatformUser[] = [
  { id: 'a1', name: 'Marvin McKinney', avatarColor: '#FCA5A5', email: 'marvin.mckinney@example.com', phone: '(312) 555-0177', flag: '🇨🇦', country: 'Canada', lastLogin: '02 Oct. 23' },
  { id: 'a2', name: 'Annette Black', avatarColor: '#C4B5FD', email: 'annette.black@example.com', phone: '(415) 555-0142', flag: '🇮🇹', country: 'Italy', lastLogin: '14 Sep. 23' },
]

const initialBlockedUsers: PlatformUser[] = [
  { id: 'b1', name: 'Arlene McCoy', avatarColor: '#86EFAC', email: 'arlene.mccoy@example.com', phone: '(917) 555-0163', flag: '🇳🇬', country: 'Nigeria', lastLogin: '28 Aug. 23' },
  { id: 'b2', name: 'Demi Wilkinson', avatarColor: '#FDE68A', email: 'demi.wilkinson@example.com', phone: '(646) 555-0198', flag: '🇺🇸', country: 'USA', lastLogin: '11 Jul. 23' },
]

type UsersContextValue = {
  activeUsers: PlatformUser[]
  archivedUsers: PlatformUser[]
  blockedUsers: PlatformUser[]
  blockUser: (id: string) => void
  unblockUser: (id: string) => void
  archiveUser: (id: string) => void
  unarchiveUser: (id: string) => void
  deleteUser: (id: string) => void
}

const UsersContext = createContext<UsersContextValue | null>(null)

export function UsersProvider({ children }: { children: ReactNode }) {
  const [activeUsers, setActiveUsers] = useState(initialActiveUsers)
  const [archivedUsers, setArchivedUsers] = useState(initialArchivedUsers)
  const [blockedUsers, setBlockedUsers] = useState(initialBlockedUsers)

  function findAndRemove(id: string): PlatformUser | null {
    let found: PlatformUser | null = null
    setActiveUsers((prev) => {
      const match = prev.find((u) => u.id === id)
      if (match) found = match
      return prev.filter((u) => u.id !== id)
    })
    setArchivedUsers((prev) => {
      const match = prev.find((u) => u.id === id)
      if (match) found = match
      return prev.filter((u) => u.id !== id)
    })
    setBlockedUsers((prev) => {
      const match = prev.find((u) => u.id === id)
      if (match) found = match
      return prev.filter((u) => u.id !== id)
    })
    return found
  }

  function moveUser(id: string, allLists: PlatformUser[][], setter: (u: PlatformUser) => void) {
    const user = allLists.flat().find((u) => u.id === id)
    if (!user) return
    findAndRemove(id)
    setter(user)
  }

  function blockUser(id: string) {
    moveUser(id, [activeUsers, archivedUsers], (user) =>
      setBlockedUsers((prev) => [user, ...prev])
    )
  }

  function unblockUser(id: string) {
    moveUser(id, [blockedUsers], (user) => setActiveUsers((prev) => [user, ...prev]))
  }

  function archiveUser(id: string) {
    moveUser(id, [activeUsers, blockedUsers], (user) =>
      setArchivedUsers((prev) => [user, ...prev])
    )
  }

  function unarchiveUser(id: string) {
    moveUser(id, [archivedUsers], (user) => setActiveUsers((prev) => [user, ...prev]))
  }

  function deleteUser(id: string) {
    findAndRemove(id)
  }

  return (
    <UsersContext
      value={{
        activeUsers,
        archivedUsers,
        blockedUsers,
        blockUser,
        unblockUser,
        archiveUser,
        unarchiveUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext>
  )
}

export function useUsers() {
  const context = use(UsersContext)
  if (!context) throw new Error('useUsers must be used within a UsersProvider')
  return context
}
