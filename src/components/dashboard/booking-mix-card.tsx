import { SplitBar } from '#/components/dashboard/split-bar'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

export function BookingMixCard() {
  const { sourceBreakdown, propertyTypeSplit, guestVerificationBreakdown, firstTimeGuestCount, repeatGuestCount } =
    useDashboardMetrics()

  return (
    <div className="flex h-[374px] w-full flex-col gap-5 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Booking Mix</p>
      <div className="flex flex-col gap-5 overflow-y-auto">
        <SplitBar
          title="Consumer vs Corporate"
          segments={sourceBreakdown.map((s) => ({ label: s.label, value: s.count }))}
        />
        <SplitBar
          title="Hotel vs Shortlet"
          segments={propertyTypeSplit.map((s) => ({ label: s.label, value: s.count }))}
        />
        <SplitBar
          title="First-time vs Repeat Guests"
          segments={[
            { label: 'First-time', value: firstTimeGuestCount },
            { label: 'Repeat', value: repeatGuestCount },
          ]}
        />
        <SplitBar
          title="Guest Verification Tier"
          segments={guestVerificationBreakdown.map((t) => ({ label: t.label, value: t.count }))}
        />
      </div>
    </div>
  )
}
