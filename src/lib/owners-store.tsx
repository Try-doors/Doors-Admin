import { createContext, use, useState, type ReactNode } from 'react'

import type { Owner } from '#/components/owners/owners-table'

const initialActiveOwners: Owner[] = [
  {
    id: '1',
    name: 'John Doe',
    avatarColor: '#64748B',
    email: 'michelle.rivera@example.com',
    phone: '0810 123 4567',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '2',
    name: 'Jenny Wilson',
    avatarColor: '#D1BAA9',
    email: 'jackson.graham@example.com',
    phone: '0809 012 3456',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '3',
    name: 'Cody Fisher',
    avatarColor: '#ABB677',
    email: 'michael.mitc@example.com',
    phone: '0813 456 7890',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '4',
    name: 'Ronald Richards',
    avatarColor: '#94A3B8',
    email: 'alma.lawson@example.com',
    phone: '0807 890 1234',
    userType: 'Business',
    date: '19 Nov. 23',
  },
  {
    id: '5',
    name: 'Jane Cooper',
    avatarColor: '#C3C7DF',
    email: 'jessica.hanson@example.com',
    phone: '0814 567 8901',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '6',
    name: 'Esther Howard',
    avatarColor: '#D1BAA9',
    email: 'dolores.chambers@example.com',
    phone: '0815 678 9012',
    userType: 'Business',
    date: '19 Nov. 23',
  },
  {
    id: '7',
    name: 'Robert Fox',
    avatarColor: '#D2B1AC',
    email: 'felicia.reid@example.com',
    phone: '0818 901 2345',
    userType: 'Business',
    date: '19 Nov. 23',
  },
  {
    id: '8',
    name: 'Cameron Williamson',
    avatarColor: '#9CA3AF',
    email: 'kenzi.lawson@example.com',
    phone: '0812 345 6789',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '9',
    name: 'Savannah Nguyen',
    avatarColor: '#A9B58D',
    email: 'bill.sanders@example.com',
    phone: '0805 678 9012',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
  {
    id: '10',
    name: 'Jerome Bell',
    avatarColor: '#B8A9D1',
    email: 'willie.jennings@example.com',
    phone: '0704 567 8901',
    userType: 'Business',
    date: '19 Nov. 23',
  },
  {
    id: '11',
    name: 'Leslie Alexander',
    avatarColor: '#D2DBBD',
    email: 'nevaeh.simmons@example.com',
    phone: '0816 789 0123',
    userType: 'Individual',
    date: '19 Nov. 23',
  },
]

const initialPendingOwners: Owner[] = [
  {
    id: 'p1',
    name: 'Darlene Robertson',
    avatarColor: '#7DD3FC',
    email: 'darlene.robertson@example.com',
    phone: '0813 220 4471',
    userType: 'Individual',
    date: '21 Nov. 23',
  },
  {
    id: 'p2',
    name: 'Guy Hawkins',
    avatarColor: '#FDBA74',
    email: 'guy.hawkins@example.com',
    phone: '0705 990 1123',
    userType: 'Business',
    date: '22 Nov. 23',
  },
]

const avatarPalette = ['#7DD3FC', '#FCA5A5', '#86EFAC', '#FDE68A', '#C4B5FD', '#F9A8D4', '#FDBA74']

function randomAvatarColor() {
  return avatarPalette[Math.floor(Math.random() * avatarPalette.length)]
}

function today() {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(',', '.')
}

type NewOwnerInput = {
  name: string
  email: string
  phone: string
  userType: Owner['userType']
  address?: string
  idNumber?: string
  kycFile?: { name: string; size: string }
}

type OwnersContextValue = {
  activeOwners: Owner[]
  pendingOwners: Owner[]
  addOwner: (input: NewOwnerInput) => void
  deleteActiveOwner: (id: string) => void
  deletePendingOwner: (id: string) => void
  approveOwner: (id: string) => void
  updateOwner: (id: string, updates: Partial<Owner>) => void
}

const OwnersContext = createContext<OwnersContextValue | null>(null)

export function OwnersProvider({ children }: { children: ReactNode }) {
  const [activeOwners, setActiveOwners] = useState(initialActiveOwners)
  const [pendingOwners, setPendingOwners] = useState(initialPendingOwners)

  function addOwner(input: NewOwnerInput) {
    setActiveOwners((prev) => [
      {
        id: crypto.randomUUID(),
        avatarColor: randomAvatarColor(),
        date: today(),
        ...input,
      },
      ...prev,
    ])
  }

  function deleteActiveOwner(id: string) {
    setActiveOwners((prev) => prev.filter((owner) => owner.id !== id))
  }

  function deletePendingOwner(id: string) {
    setPendingOwners((prev) => prev.filter((owner) => owner.id !== id))
  }

  function approveOwner(id: string) {
    const owner = pendingOwners.find((o) => o.id === id)
    if (!owner) return
    setPendingOwners((prev) => prev.filter((o) => o.id !== id))
    setActiveOwners((prev) => [{ ...owner, date: today() }, ...prev])
  }

  function updateOwner(id: string, updates: Partial<Owner>) {
    setActiveOwners((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
    setPendingOwners((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  return (
    <OwnersContext
      value={{
        activeOwners,
        pendingOwners,
        addOwner,
        deleteActiveOwner,
        deletePendingOwner,
        approveOwner,
        updateOwner,
      }}
    >
      {children}
    </OwnersContext>
  )
}

export function useOwners() {
  const context = use(OwnersContext)
  if (!context) throw new Error('useOwners must be used within an OwnersProvider')
  return context
}
