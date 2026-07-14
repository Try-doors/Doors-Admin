import { useState } from 'react'
import { Plus } from 'lucide-react'

type Category = {
  title: string
  items: string[]
}

const categories: Category[] = [
  { title: 'Basics', items: ['Toilet paper', 'Towel', 'Pillow'] },
  { title: 'Bathroom', items: ['Shower', 'Bathtub', 'Hair Dryer', 'Hot Water'] },
  { title: 'Bedroom and Laundry', items: ['Hangers', 'Iron', 'Washer', 'Dryer'] },
  { title: 'Entertainment', items: ['Tv', 'Game Console', 'Books', 'Board Games'] },
  { title: 'Internet and Office', items: ['Wi-Fi', 'Dedicated Workspace', 'Printer'] },
  { title: 'Parking and Facilities', items: ['Free Parking', 'EV Charger'] },
  { title: 'Services', items: ['Pets Allowed', 'Long-Term Stays', 'Smoking Allowed'] },
]

type AmenitiesStepProps = {
  selected: Set<string>
  onChange: (selected: Set<string>) => void
  hideIntro?: boolean
}

export function AmenitiesStep({ selected, onChange, hideIntro }: AmenitiesStepProps) {
  const [customByCategory, setCustomByCategory] = useState<Record<string, string[]>>({})
  const [addingCategory, setAddingCategory] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  function toggle(item: string) {
    const next = new Set(selected)
    if (next.has(item)) next.delete(item)
    else next.add(item)
    onChange(next)
  }

  function addCustomAmenity(category: string) {
    const label = draft.trim()
    if (!label) {
      setAddingCategory(null)
      return
    }
    setCustomByCategory((prev) => ({
      ...prev,
      [category]: [...(prev[category] ?? []), label],
    }))
    const next = new Set(selected)
    next.add(label)
    onChange(next)
    setDraft('')
    setAddingCategory(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {!hideIntro && (
        <div className="text-center">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Amenities</h1>
          <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
            Tell us more about your property
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {categories.map((category) => {
          const allItems = [...category.items, ...(customByCategory[category.title] ?? [])]
          return (
            <div key={category.title} className="rounded-2xl border border-[#E2E4E9] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[16px] font-medium text-[#0A0D14]">{category.title}</p>
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory(category.title)
                    setDraft('')
                  }}
                  className="flex items-center gap-0.5 text-[14px] font-medium text-[#2B59FF]"
                >
                  <Plus className="size-4" strokeWidth={2} />
                  New Amenity
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allItems.map((item) => {
                  const isSelected = selected.has(item)
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggle(item)}
                      className={
                        'rounded-full border px-4 py-1.5 text-[14px] ' +
                        (isSelected
                          ? 'border-[#2970FF] bg-[#EFF4FF] text-[#2970FF]'
                          : 'border-[#E2E4E9] bg-white text-[#0A0D14]')
                      }
                    >
                      {item}
                    </button>
                  )
                })}
                {addingCategory === category.title && (
                  <input
                    autoFocus
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addCustomAmenity(category.title)
                      if (e.key === 'Escape') setAddingCategory(null)
                    }}
                    onBlur={() => addCustomAmenity(category.title)}
                    placeholder="New amenity..."
                    className="rounded-full border border-[#2970FF] bg-white px-4 py-1.5 text-[14px] text-[#0A0D14] outline-none"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
