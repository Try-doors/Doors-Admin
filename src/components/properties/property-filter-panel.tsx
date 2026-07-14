import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

import { useOwners } from '#/lib/owners-store'
import type { PropertyStatus } from '#/lib/properties-store'

export type PropertyFilters = {
  categories: Set<PropertyStatus>
  types: Set<string>
  ownerId: string
  country: string
  state: string
  city: string
  localGovernment: string
  zipcode: string
}

export const emptyPropertyFilters: PropertyFilters = {
  categories: new Set(),
  types: new Set(),
  ownerId: '',
  country: '',
  state: '',
  city: '',
  localGovernment: '',
  zipcode: '',
}

const propertyTypes = ['Duplex', 'Bungalow', 'Apartment']
const countries = ['Nigeria', 'USA', 'UK', 'Canada', 'Guinea', 'Palestine', 'Belgium', 'Italy']

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98] w-full border outline-none'
const selectClassName =
  'h-auto w-full appearance-none rounded-[10px] border border-[#E2E4E9] bg-white p-3 pr-9 text-[14px] text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex w-[164px] items-center gap-2 text-[14px] tracking-[-0.084px] text-[#0A0D14]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]"
      />
      {label}
    </label>
  )
}

export function PropertyFilterPanel({
  open,
  initial,
  onClose,
  onApply,
}: {
  open: boolean
  initial: PropertyFilters
  onClose: () => void
  onApply: (filters: PropertyFilters) => void
}) {
  const { activeOwners } = useOwners()
  const [draft, setDraft] = useState<PropertyFilters>(initial)

  if (!open) return null

  function toggleSet<T>(set: Set<T>, value: T) {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    return next
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-[476px] flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[30px] pt-6 pb-6">
          <p className="text-[24px] font-semibold tracking-[-0.5px] text-[#0C111D]">Filter By</p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-7 items-center justify-center text-[#0A0D14]"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-[30px]">
          <div className="flex flex-col gap-3">
            <p className={labelClassName}>Category</p>
            <div className="flex gap-4">
              <Checkbox
                label="Rent"
                checked={draft.categories.has('RENT')}
                onChange={() => setDraft((d) => ({ ...d, categories: toggleSet(d.categories, 'RENT') }))}
              />
              <Checkbox
                label="Sell"
                checked={draft.categories.has('PURCHASE')}
                onChange={() =>
                  setDraft((d) => ({ ...d, categories: toggleSet(d.categories, 'PURCHASE') }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className={labelClassName}>Property Type</p>
            <div className="flex flex-wrap gap-4">
              {propertyTypes.map((type) => (
                <Checkbox
                  key={type}
                  label={type}
                  checked={draft.types.has(type)}
                  onChange={() => setDraft((d) => ({ ...d, types: toggleSet(d.types, type) }))}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Property Owner</Label>
            <div className="relative">
              <select
                value={draft.ownerId}
                onChange={(e) => setDraft((d) => ({ ...d, ownerId: e.target.value }))}
                className={selectClassName}
              >
                <option value="">Select Owner</option>
                {activeOwners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#868C98]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>Country</Label>
            <div className="relative">
              <select
                value={draft.country}
                onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
                className={selectClassName}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#868C98]" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label>State</Label>
            <input
              value={draft.state}
              onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))}
              placeholder="Enter State"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>City</Label>
            <input
              value={draft.city}
              onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
              placeholder="Enter City"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Local Government</Label>
            <input
              value={draft.localGovernment}
              onChange={(e) => setDraft((d) => ({ ...d, localGovernment: e.target.value }))}
              placeholder="Enter Local Government"
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1 pb-6">
            <Label>Zipcode</Label>
            <input
              value={draft.zipcode}
              onChange={(e) => setDraft((d) => ({ ...d, zipcode: e.target.value }))}
              placeholder="Enter Zipcode"
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex h-[88px] shrink-0 items-center gap-4 px-[30px]">
          <button
            type="button"
            onClick={() => setDraft(emptyPropertyFilters)}
            className="flex-1 rounded-[10px] border border-[#E2E4E9] bg-white py-2.5 text-center text-[14px] font-medium text-[#525866]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="flex-1 rounded-[10px] bg-[#2B59FF] py-2.5 text-center text-[14px] font-medium text-white hover:bg-[#2B59FF]/90"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: string }) {
  return <p className={labelClassName}>{children}</p>
}
