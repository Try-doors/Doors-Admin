import { FilterChip, ViewAllButton } from '#/components/dashboard/filter-chip'
import { TrendBadge } from '#/components/dashboard/trend-badge'

const locations = [
  { rank: 1, flag: '🇺🇸', name: 'USA', count: 240, direction: 'up' as const },
  { rank: 2, flag: '🇳🇬', name: 'Nigeria', count: 240, direction: 'up' as const },
  { rank: 3, flag: '🇨🇦', name: 'Canada', count: 240, direction: 'down' as const },
  { rank: 4, flag: '🇬🇧', name: 'United Kingdom', count: 240, direction: 'up' as const },
  { rank: 5, flag: '🇧🇪', name: 'Belgium', count: 240, direction: 'down' as const },
  { rank: 6, flag: '🇮🇹', name: 'Italy', count: 240, direction: 'up' as const },
]

export function CustomerLocationCard({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <div className="flex h-[408px] w-full shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[348px]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
          Customer Location
        </p>
        <FilterChip label="All Time" />
      </div>
      <div className="flex flex-col">
        {locations.map((location) => (
          <div
            key={location.name}
            className="flex items-center gap-1 border-b border-[#F6F8FA] px-3 py-2.5 last:border-b-0"
          >
            <p className="w-[23px] text-[14px] font-medium tracking-[-0.084px] text-black">
              {location.rank}
            </p>
            <div className="flex flex-1 items-center gap-2">
              <span className="text-[20px] leading-none">{location.flag}</span>
              <p className="text-[14px] tracking-[-0.084px] text-[#525866]">{location.name}</p>
            </div>
            <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
              {location.count}
            </p>
            <TrendBadge direction={location.direction} />
          </div>
        ))}
      </div>
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
