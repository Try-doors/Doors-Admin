import { createContext, use, useState, type ReactNode } from 'react'

export type AdminProfile = {
  name: string
  email: string
  address: string
  phone: string
  avatarColor: string
}

const initialProfile: AdminProfile = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  address: 'Block 12, Mercy Estate, Ibadan',
  phone: '0803 456 7890',
  avatarColor: '#2B59FF',
}

type ProfileContextValue = {
  profile: AdminProfile
  updateProfile: (updates: Partial<AdminProfile>) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(initialProfile)

  function updateProfile(updates: Partial<AdminProfile>) {
    setProfile((prev) => ({ ...prev, ...updates }))
  }

  return <ProfileContext value={{ profile, updateProfile }}>{children}</ProfileContext>
}

export function useProfile() {
  const context = use(ProfileContext)
  if (!context) throw new Error('useProfile must be used within a ProfileProvider')
  return context
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
