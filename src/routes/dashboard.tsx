import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, ChevronDown } from 'lucide-react'

import { AllActivitiesPanel } from '#/components/dashboard/all-activities-panel'
import { BarChartCard } from '#/components/dashboard/bar-chart-card'
import { BookingMixCard } from '#/components/dashboard/booking-mix-card'
import { BookingStatusChart } from '#/components/dashboard/booking-status-chart'
import { CustomerLocationCard } from '#/components/dashboard/customer-location-card'
import { CustomerLocationPanel } from '#/components/dashboard/customer-location-panel'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { PayoutPipelineCard } from '#/components/dashboard/payout-pipeline-card'
import { PlatformCompositionCard } from '#/components/dashboard/platform-composition-card'
import { PropertyBreakdownCard } from '#/components/dashboard/property-breakdown-card'
import { RecentActivityCard } from '#/components/dashboard/recent-activity-card'
import { StatCards } from '#/components/dashboard/stat-cards'
import { TopAgentsCard } from '#/components/dashboard/top-agents-card'
import { TopAgentsPanel } from '#/components/dashboard/top-agents-panel'
import { TotalTrafficCard } from '#/components/dashboard/total-traffic-card'
import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

export const Route = createFileRoute('/dashboard')({ component: Dashboard })

type OpenPanel = 'activities' | 'agents' | 'location' | null

function Dashboard() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)
  const { bookingsByMonth } = useDashboardMetrics()

  const bookingsData = bookingsByMonth.map((m) => ({ label: m.label, value: m.bookings }))
  const revenueData = bookingsByMonth.map((m) => ({ label: m.label, value: m.revenue }))

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-0.5px] text-[#0A0D14]">
            Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <FilterChipButton label="All Product" />
            <FilterChipButton label="Today" withCalendar />
          </div>
        </div>

        <StatCards />

        <div className="flex flex-col gap-5 xl:flex-row">
          <BarChartCard
            title="Bookings by Month"
            chips={['Last 6 Months']}
            data={bookingsData}
            unit="Bookings"
            className="w-full xl:w-[808px]"
          />
          <PropertyBreakdownCard />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <TotalTrafficCard />
          <BarChartCard
            title="Revenue by Month"
            chips={['Last 6 Months']}
            data={revenueData}
            unit="₦"
            className="w-full xl:w-[808px]"
          />
        </div>

        <BookingStatusChart />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <PayoutPipelineCard />
          <BookingMixCard />
          <PlatformCompositionCard />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <RecentActivityCard onViewAll={() => setOpenPanel('activities')} />
          <TopAgentsCard onViewAll={() => setOpenPanel('agents')} />
          <CustomerLocationCard onViewAll={() => setOpenPanel('location')} />
        </div>
      </div>

      <AllActivitiesPanel
        open={openPanel === 'activities'}
        onClose={() => setOpenPanel(null)}
      />
      <TopAgentsPanel open={openPanel === 'agents'} onClose={() => setOpenPanel(null)} />
      <CustomerLocationPanel
        open={openPanel === 'location'}
        onClose={() => setOpenPanel(null)}
      />
    </DashboardLayout>
  )
}

function FilterChipButton({ label, withCalendar }: { label: string; withCalendar?: boolean }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] bg-white px-3 py-2 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
    >
      {withCalendar && <Calendar className="size-4" strokeWidth={1.75} />}
      {label}
      <ChevronDown className="size-4" strokeWidth={1.75} />
    </button>
  )
}
