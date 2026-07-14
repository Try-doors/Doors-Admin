import { FilterChip } from '#/components/dashboard/filter-chip'

const trafficStats = [
  { label: 'Total Visited', value: '240,500' },
  { label: 'Total Applied', value: '240,500' },
  { label: 'Total Rented', value: '240,500' },
  { label: 'Total Purchased', value: '240,500' },
]

export function TotalTrafficCard() {
  return (
    <div className="flex h-[374px] w-full shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[256px]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Total Traffic</p>
        <FilterChip label="Today" />
      </div>
      <div className="flex flex-col gap-2.5">
        {trafficStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-[#E2E4E9] px-3 py-2">
            <p className="text-[12px] text-[#525866]">{stat.label}</p>
            <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
