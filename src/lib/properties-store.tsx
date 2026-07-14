import { createContext, use, useState, type ReactNode } from 'react'

export type PropertyStatus = 'RENT' | 'PURCHASE'

export type PropertyPhoto = { id: string; url: string; room: string }
export type PropertyVideo = { id: string; url: string }

export type Property = {
  id: string
  name: string
  applications?: number
  status: PropertyStatus
  type: string
  flag: string
  country: string
  beds: number
  baths: number
  garages: number
  ownerId?: string
  ownerName?: string
  ownerAvatarColor?: string
  description?: string
  state?: string
  city?: string
  localGovernment?: string
  zipcode?: string
  sittingRoom?: number
  kitchen?: number
  amenities?: string[]
  photos?: PropertyPhoto[]
  videos?: PropertyVideo[]
  housePlanFile?: { name: string; size: string }
  threeDPlanUrl?: string
}

const initialProperties: Property[] = [
  { id: '1', name: 'New Property at Lagos Road', applications: 12, status: 'RENT', type: 'Duplex', flag: '🇳🇬', country: 'Nigeria', beds: 2, baths: 2, garages: 3, ownerName: 'John Doe', ownerAvatarColor: '#64748B' },
  { id: '2', name: 'New Property at Lagos Road', status: 'PURCHASE', type: 'Duplex', flag: '🇺🇸', country: 'USA', beds: 2, baths: 2, garages: 3, ownerName: 'Jenny Wilson', ownerAvatarColor: '#D1BAA9' },
  { id: '3', name: 'New Property at Lagos Road', applications: 12, status: 'RENT', type: 'Bungalow', flag: '🇬🇧', country: 'UK', beds: 2, baths: 2, garages: 3, ownerName: 'Cody Fisher', ownerAvatarColor: '#ABB677' },
  { id: '4', name: 'New Property at Lagos Road', status: 'RENT', type: 'Duplex', flag: '🇺🇸', country: 'USA', beds: 2, baths: 2, garages: 3, ownerName: 'Ronald Richards', ownerAvatarColor: '#94A3B8' },
  { id: '5', name: 'New Property at Lagos Road', applications: 12, status: 'PURCHASE', type: 'Bungalow', flag: '🇬🇳', country: 'Guinea', beds: 2, baths: 2, garages: 3, ownerName: 'Jane Cooper', ownerAvatarColor: '#C3C7DF' },
  { id: '6', name: 'New Property at Lagos Road', status: 'RENT', type: 'Bungalow', flag: '🇵🇸', country: 'Palestine', beds: 2, baths: 2, garages: 3, ownerName: 'Esther Howard', ownerAvatarColor: '#D1BAA9' },
  { id: '7', name: 'New Property at Lagos Road', status: 'PURCHASE', type: 'Duplex', flag: '🇳🇬', country: 'Nigeria', beds: 2, baths: 2, garages: 3, ownerName: 'Robert Fox', ownerAvatarColor: '#D2B1AC' },
  { id: '8', name: 'New Property at Lagos Road', applications: 12, status: 'PURCHASE', type: 'Duplex', flag: '🇳🇬', country: 'Nigeria', beds: 2, baths: 2, garages: 3, ownerName: 'Cameron Williamson', ownerAvatarColor: '#9CA3AF' },
]

type NewPropertyInput = {
  name: string
  status: PropertyStatus
  type: string
  country: string
  beds: number
  baths: number
  garages: number
  ownerId?: string
  ownerName?: string
  ownerAvatarColor?: string
  description?: string
  state?: string
  city?: string
  localGovernment?: string
  zipcode?: string
  sittingRoom?: number
  kitchen?: number
  amenities?: string[]
  photos?: PropertyPhoto[]
  videos?: PropertyVideo[]
}

const countryFlags: Record<string, string> = {
  Nigeria: '🇳🇬',
  USA: '🇺🇸',
  UK: '🇬🇧',
  Guinea: '🇬🇳',
  Palestine: '🇵🇸',
  Canada: '🇨🇦',
  Belgium: '🇧🇪',
  Italy: '🇮🇹',
}

type PropertiesContextValue = {
  properties: Property[]
  addProperty: (input: NewPropertyInput) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
}

const PropertiesContext = createContext<PropertiesContextValue | null>(null)

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState(initialProperties)

  function addProperty(input: NewPropertyInput) {
    setProperties((prev) => [
      {
        id: crypto.randomUUID(),
        flag: countryFlags[input.country] ?? '🏳️',
        ...input,
      },
      ...prev,
    ])
  }

  function updateProperty(id: string, updates: Partial<Property>) {
    setProperties((prev) =>
      prev.map((property) =>
        property.id === id
          ? {
              ...property,
              ...updates,
              flag: updates.country ? (countryFlags[updates.country] ?? '🏳️') : property.flag,
            }
          : property,
      ),
    )
  }

  function deleteProperty(id: string) {
    setProperties((prev) => prev.filter((property) => property.id !== id))
  }

  return (
    <PropertiesContext value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertiesContext>
  )
}

export function useProperties() {
  const context = use(PropertiesContext)
  if (!context) throw new Error('useProperties must be used within a PropertiesProvider')
  return context
}
