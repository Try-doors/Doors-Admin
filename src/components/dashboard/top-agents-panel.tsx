import { useState } from 'react'

import { CircleAvatar } from '#/components/dashboard/circle-avatar'
import { DetailPanel } from '#/components/dashboard/detail-panel'
import { PanelFilterDropdown } from '#/components/dashboard/panel-filter-dropdown'
import { TrendBadge } from '#/components/dashboard/trend-badge'

const owners = [
  { name: 'Nneka Chukwu', count: 240, direction: 'up' as const, color: '#C4B5FD' },
  { name: 'Oladejo israel', count: 240, direction: 'up' as const, color: '#F9A8D4' },
  { name: 'Adegboyoga Precious', count: 240, direction: 'down' as const, color: '#93C5FD' },
  { name: 'Adebayo Salami', count: 240, direction: 'up' as const, color: '#86EFAC' },
  { name: 'Eze Chinedu', count: 240, direction: 'down' as const, color: '#525866' },
  { name: 'Damilare Usman', count: 240, direction: 'up' as const, color: '#FDBA74' },
  { name: 'Oladejo israel', count: 240, direction: 'up' as const, color: '#F9A8D4' },
  { name: 'Adebayo Salami', count: 240, direction: 'up' as const, color: '#86EFAC' },
  { name: 'Nneka Chukwu', count: 240, direction: 'down' as const, color: '#C4B5FD' },
  { name: 'Desmond Tutu', count: 240, direction: 'up' as const, color: '#FCA5A5' },
  { name: 'Jibike Alarape', count: 240, direction: 'down' as const, color: '#A5B4FC' },
  { name: 'Baba Kaothat', count: 240, direction: 'up' as const, color: '#67E8F9' },
  { name: 'Adebanji Bolaji', count: 240, direction: 'down' as const, color: '#FDE68A' },
  { name: 'Desmond Tutu', count: 240, direction: 'up' as const, color: '#FCA5A5' },
  { name: 'Jide Kosoko', count: 240, direction: 'up' as const, color: '#93C5FD' },
]

export function TopAgentsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [filter, setFilter] = useState('All Time')

  return (
    <DetailPanel
      open={open}
      onClose={onClose}
      title="Top Owners"
      headerRight={
        <PanelFilterDropdown
          label={filter}
          options={['All Time', 'Today', 'Week', 'Year']}
          onSelect={setFilter}
        />
      }
    >
      <div className="flex flex-col">
        {owners.map((owner, index) => (
          <div
            key={`${owner.name}-${index}`}
            className="flex items-center gap-2 border-b border-[#F6F8FA] px-3 py-2 last:border-b-0"
          >
            <div className="flex flex-1 items-center gap-1.5">
              <CircleAvatar name={owner.name} color={owner.color} size={32} />
              <p className="truncate text-[14px] tracking-[-0.084px] text-[#0A0D14]">
                {owner.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-medium tracking-[-0.084px] text-black">
                {owner.count}
              </p>
              <TrendBadge direction={owner.direction} />
            </div>
          </div>
        ))}
      </div>
    </DetailPanel>
  )
}
