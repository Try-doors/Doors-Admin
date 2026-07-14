import { useState } from 'react'

import { DetailPanel } from '#/components/dashboard/detail-panel'
import { PanelFilterDropdown } from '#/components/dashboard/panel-filter-dropdown'
import { TrendBadge } from '#/components/dashboard/trend-badge'

const locations = [
  { rank: 1, flag: '🇺🇸', name: 'USA', count: 240, direction: 'up' as const },
  { rank: 2, flag: '🇳🇬', name: 'Nigeria', count: 240, direction: 'up' as const },
  { rank: 3, flag: '🇨🇦', name: 'Canada', count: 240, direction: 'down' as const },
  { rank: 4, flag: '🇬🇧', name: 'United Kingdom', count: 240, direction: 'up' as const },
  { rank: 5, flag: '🇧🇪', name: 'Belgium', count: 240, direction: 'down' as const },
  { rank: 6, flag: '🇮🇹', name: 'Italy', count: 240, direction: 'up' as const },
  { rank: 7, flag: '🇧🇷', name: 'Brazil', count: 240, direction: 'up' as const },
  { rank: 8, flag: '🇲🇽', name: 'Mexico', count: 240, direction: 'up' as const },
  { rank: 9, flag: '🇦🇷', name: 'Argentina', count: 240, direction: 'down' as const },
  { rank: 10, flag: '🇪🇬', name: 'Egypt', count: 240, direction: 'up' as const },
  { rank: 11, flag: '🇵🇱', name: 'Poland', count: 240, direction: 'down' as const },
  { rank: 12, flag: '🇸🇪', name: 'Sweden', count: 240, direction: 'up' as const },
  { rank: 13, flag: '🇪🇸', name: 'Spain', count: 240, direction: 'down' as const },
  { rank: 14, flag: '🇩🇪', name: 'Germany', count: 240, direction: 'up' as const },
  { rank: 15, flag: '🇨🇳', name: 'China', count: 240, direction: 'up' as const },
]

export function CustomerLocationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [filter, setFilter] = useState('All Time')

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="Customer Location"
      headerRight={
        <PanelFilterDropdown
          label={filter}
          options={['All Time', 'Today', 'Week', 'Year']}
          onSelect={setFilter}
        />
      }
    >
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
    </DetailPanel>
  )
}
