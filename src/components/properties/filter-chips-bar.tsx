import { Home, MapPin, Tag, User, X } from 'lucide-react'

import { useOwners } from '#/lib/owners-store'
import { emptyPropertyFilters, type PropertyFilters } from '#/components/properties/property-filter-panel'

type Chip = { key: string; label: string; icon: typeof Tag; onRemove: () => void }

export function FilterChipsBar({
  filters,
  onChange,
}: {
  filters: PropertyFilters
  onChange: (filters: PropertyFilters) => void
}) {
  const { activeOwners } = useOwners()
  const owner = activeOwners.find((o) => o.id === filters.ownerId)

  const chips: Chip[] = []

  for (const category of filters.categories) {
    chips.push({
      key: `category-${category}`,
      label: category === 'RENT' ? 'Rent' : 'Sell',
      icon: Tag,
      onRemove: () => {
        const next = new Set(filters.categories)
        next.delete(category)
        onChange({ ...filters, categories: next })
      },
    })
  }

  for (const type of filters.types) {
    chips.push({
      key: `type-${type}`,
      label: type,
      icon: Home,
      onRemove: () => {
        const next = new Set(filters.types)
        next.delete(type)
        onChange({ ...filters, types: next })
      },
    })
  }

  if (owner) {
    chips.push({
      key: 'owner',
      label: owner.name,
      icon: User,
      onRemove: () => onChange({ ...filters, ownerId: '' }),
    })
  }

  if (filters.country) {
    chips.push({
      key: 'country',
      label: filters.country,
      icon: MapPin,
      onRemove: () => onChange({ ...filters, country: '' }),
    })
  }

  const textFields: Array<[keyof PropertyFilters, string]> = [
    ['state', filters.state],
    ['city', filters.city],
    ['localGovernment', filters.localGovernment],
    ['zipcode', filters.zipcode],
  ]
  for (const [key, value] of textFields) {
    if (value) {
      chips.push({
        key,
        label: value,
        icon: MapPin,
        onRemove: () => onChange({ ...filters, [key]: '' }),
      })
    }
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => {
        const Icon = chip.icon
        return (
          <span
            key={chip.key}
            className="flex items-center gap-1.5 rounded-full bg-[#EFF4FF] py-1 pl-2.5 pr-1.5 text-[14px] font-medium text-[#2B59FF]"
          >
            <Icon className="size-4" strokeWidth={1.75} />
            {chip.label}
            <button
              type="button"
              onClick={chip.onRemove}
              className="flex size-4 items-center justify-center rounded-full hover:bg-[#2B59FF]/10"
            >
              <X className="size-3.5" strokeWidth={2} />
            </button>
          </span>
        )
      })}
      <button
        type="button"
        onClick={() => onChange(emptyPropertyFilters)}
        className="rounded-full border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
      >
        Reset All
      </button>
    </div>
  )
}
