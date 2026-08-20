import { FilterChip, ViewAllButton } from '#/components/dashboard/filter-chip'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

export function CustomerLocationCard({ onViewAll }: { onViewAll?: () => void }) {
  const { propertyCountryBreakdown } = useDashboardMetrics()

  return (
    <div className="flex h-[408px] w-full shrink-0 flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[348px]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
          Properties by Country
        </p>
        <FilterChip label="All Time" />
      </div>
      {propertyCountryBreakdown.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No properties yet
        </div>
      ) : (
        <div className="flex flex-col">
          {propertyCountryBreakdown.map((location, index) => (
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
      <ViewAllButton onClick={onViewAll} />
    </div>
  )
}
