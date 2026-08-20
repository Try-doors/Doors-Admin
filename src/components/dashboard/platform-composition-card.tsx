import { SplitBar } from '#/components/dashboard/split-bar'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

export function PlatformCompositionCard() {
  const { usersByStatus, ownersByType, propertiesByListingStatus } = useDashboardMetrics()

  return (
    <div className="flex h-[374px] w-full flex-col gap-5 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Platform Composition</p>
      <div className="flex flex-col gap-5 overflow-y-auto">
        <SplitBar title="Users by Status" segments={usersByStatus} />
        <SplitBar title="Owners by Type" segments={ownersByType} />
        <SplitBar title="Properties by Listing" segments={propertiesByListingStatus} />
      </div>
    </div>
  )
}
