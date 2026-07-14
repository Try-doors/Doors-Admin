import { AmenitiesStep } from '#/components/new-property/amenities-step'

export function AmenitiesTab({
  selected,
  onChange,
}: {
  selected: Set<string>
  onChange: (selected: Set<string>) => void
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Amenities</p>
      <AmenitiesStep selected={selected} onChange={onChange} hideIntro />
    </div>
  )
}
