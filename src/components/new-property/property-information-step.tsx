import { BedDouble, ChevronDown, DoorOpen, Sofa, UtensilsCrossed } from 'lucide-react'

import { CounterField } from '#/components/new-property/counter-field'
import { RadioOption } from '#/components/new-property/radio-option'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useOwners } from '#/lib/owners-store'
import type { PropertyFormData } from '#/routes/properties_.new'

const propertyTypes = ['Duplex', 'Bungalow', 'Apartment']

const countries = ['Nigeria', 'USA', 'UK', 'Canada', 'Guinea', 'Palestine', 'Belgium', 'Italy']

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'
const selectClassName =
  'h-auto w-full appearance-none rounded-[10px] border border-[#E2E4E9] bg-white p-3 pr-9 text-[14px] text-[#0A0D14] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'

type PropertyInformationStepProps = {
  data: PropertyFormData
  onChange: (updates: Partial<PropertyFormData>) => void
}

export function PropertyInformationStep({ data, onChange }: PropertyInformationStepProps) {
  const { activeOwners } = useOwners()

  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
          Property Information
        </h1>
        <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
          Tell us more about your property
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Property Name</Label>
          <Input
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Enter Property Name"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Property Owner</Label>
          <div className="relative">
            <select
              value={data.ownerId}
              onChange={(e) => onChange({ ownerId: e.target.value })}
              className={selectClassName}
            >
              <option value="">Select Property Owner</option>
              {activeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#868C98]" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className={labelClassName}>Property Type</p>
          <div className="flex flex-wrap gap-4">
            {propertyTypes.map((type) => (
              <RadioOption
                key={type}
                label={type}
                selected={data.type === type}
                onSelect={() => onChange({ type })}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Property Description</Label>
          <div className="flex flex-col gap-2 rounded-xl border border-[#E2E4E9] p-3 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
            <textarea
              value={data.description}
              onChange={(e) => onChange({ description: e.target.value.slice(0, 200) })}
              maxLength={200}
              rows={4}
              placeholder="Placeholder text..."
              className="w-full resize-none text-[14px] text-[#0A0D14] placeholder:text-[#868C98] focus:outline-none"
            />
            <p className="text-right text-[11px] font-medium uppercase tracking-[0.22px] text-[#868C98]">
              {data.description.length}/200
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Set up Location</p>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Country</Label>
          <div className="relative">
            <select
              value={data.country}
              onChange={(e) => onChange({ country: e.target.value })}
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
          <Label className={labelClassName}>State</Label>
          <Input
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            placeholder="Enter State"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>City</Label>
          <Input
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="Enter City"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>local government</Label>
          <Input
            value={data.localGovernment}
            onChange={(e) => onChange({ localGovernment: e.target.value })}
            placeholder="Enter local government"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className={labelClassName}>Zipcode</Label>
          <Input
            value={data.zipcode}
            onChange={(e) => onChange({ zipcode: e.target.value })}
            placeholder="Enter Zipcode"
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Specific Details</p>
        <div className="flex flex-col gap-5">
          <CounterField
            icon={BedDouble}
            label="Bedroom"
            value={data.bedroom}
            onChange={(v) => onChange({ bedroom: v })}
          />
          <CounterField
            icon={Sofa}
            label="Sitting Room"
            value={data.sittingRoom}
            onChange={(v) => onChange({ sittingRoom: v })}
          />
          <CounterField
            icon={UtensilsCrossed}
            label="Kitchen"
            value={data.kitchen}
            onChange={(v) => onChange({ kitchen: v })}
          />
          <CounterField
            icon={DoorOpen}
            label="Bathroom"
            value={data.bathroom}
            onChange={(v) => onChange({ bathroom: v })}
          />
        </div>
      </div>
    </div>
  )
}
