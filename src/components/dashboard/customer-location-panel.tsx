import { DetailPanel } from '#/components/dashboard/detail-panel'
import { useProperties } from '#/lib/properties-store'

export function CustomerLocationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { properties } = useProperties()

  const countryCounts = new Map<string, { count: number; flag: string }>()
  for (const p of properties) {
    const entry = countryCounts.get(p.country) ?? { count: 0, flag: p.flag }
    entry.count += 1
    countryCounts.set(p.country, entry)
  }
  const allLocations = Array.from(countryCounts.entries())
    .map(([country, v]) => ({ country, flag: v.flag, count: v.count }))
    .sort((a, b) => b.count - a.count)

  return (
    <DetailPanel open={open} onClose={onClose} title="Properties by Country">
      {allLocations.length === 0 ? (
        <p className="py-8 text-center text-[14px] text-[#525866]">No properties yet.</p>
      ) : (
        <div className="flex flex-col">
          {allLocations.map((location, index) => (
            <div
              key={location.country}
              className="flex items-center gap-1 border-b border-[#F6F8FA] px-3 py-2.5 last:border-b-0"
            >
              <p className="w-[23px] text-[14px] font-medium tracking-[-0.084px] text-black">
                {index + 1}
              </p>
              <div className="flex flex-1 items-center gap-2">
                <span className="text-[20px] leading-none">{location.flag}</span>
                <p className="text-[14px] tracking-[-0.084px] text-[#525866]">{location.country}</p>
              </div>
              <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
                {location.count}
              </p>
            </div>
          ))}
        </div>
      )}
    </DetailPanel>
  )
}
