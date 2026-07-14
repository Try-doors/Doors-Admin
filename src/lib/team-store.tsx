import { createContext, use, useState, type ReactNode } from 'react'

export type TeamRole = 'Admin' | 'Member'
export type TeamStatus = 'Active' | 'Blocked'

export type TeamMember = {
  id: string
  name: string
  avatarColor: string
  email: string
  role: TeamRole
  status: TeamStatus
}

const initialMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', avatarColor: '#64748B', email: 'johndoe@gmail.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jenny Wilson', avatarColor: '#D1BAA9', email: 'danghoang87hl@gmail.com', role: 'Member', status: 'Blocked' },
  { id: '3', name: 'Cody Fisher', avatarColor: '#ABB677', email: 'binhan628@gmail.com', role: 'Member', status: 'Active' },
  { id: '4', name: 'Ronald Richards', avatarColor: '#94A3B8', email: 'manhhachkt08@gmail.com', role: 'Member', status: 'Blocked' },
  { id: '5', name: 'Jane Cooper', avatarColor: '#C3C7DF', email: 'vuhaithuongnute@gmail.com', role: 'Member', status: 'Active' },
  { id: '6', name: 'Esther Howard', avatarColor: '#D1BAA9', email: 'thuhang.nute@gmail.com', role: 'Admin', status: 'Active' },
]

const avatarPalette = ['#7DD3FC', '#FCA5A5', '#86EFAC', '#FDE68A', '#C4B5FD', '#F9A8D4', '#FDBA74']

function randomAvatarColor() {
  return avatarPalette[Math.floor(Math.random() * avatarPalette.length)]
}

type TeamContextValue = {
  members: TeamMember[]
  inviteMember: (email: string, role: TeamRole) => void
  updateRole: (id: string, role: TeamRole) => void
  toggleBlocked: (id: string) => void
  deleteMember: (id: string) => void
}

const TeamContext = createContext<TeamContextValue | null>(null)

export function TeamProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState(initialMembers)

  function inviteMember(email: string, role: TeamRole) {
    const name = email.split('@')[0]
    setMembers((prev) => [
      {
        id: crypto.randomUUID(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        avatarColor: randomAvatarColor(),
        email,
        role,
        status: 'Active',
      },
      ...prev,
    ])
  }

  function updateRole(id: string, role: TeamRole) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  function toggleBlocked(id: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'Active' ? 'Blocked' : 'Active' } : m
      )
    )
  }

  function deleteMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <TeamContext value={{ members, inviteMember, updateRole, toggleBlocked, deleteMember }}>
      {children}
    </TeamContext>
  )
}

export function useTeam() {
  const context = use(TeamContext)
  if (!context) throw new Error('useTeam must be used within a TeamProvider')
  return context
}
