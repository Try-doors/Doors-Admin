import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Calendar, ChevronDown } from 'lucide-react'

import { AllActivitiesPanel } from '#/components/dashboard/all-activities-panel'
import { BarChartCard } from '#/components/dashboard/bar-chart-card'
import { CustomerLocationCard } from '#/components/dashboard/customer-location-card'
import { CustomerLocationPanel } from '#/components/dashboard/customer-location-panel'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { PropertyBreakdownCard } from '#/components/dashboard/property-breakdown-card'
import { RecentActivityCard } from '#/components/dashboard/recent-activity-card'
import { StatCards } from '#/components/dashboard/stat-cards'
import { TopAgentsCard } from '#/components/dashboard/top-agents-card'
import { TopAgentsPanel } from '#/components/dashboard/top-agents-panel'
import { TotalTrafficCard } from '#/components/dashboard/total-traffic-card'

export const Route = createFileRoute('/dashboard')({ component: Dashboard })

const rentRateData = [
  { label: 'Jan', value: 770 },
  { label: 'Feb', value: 930 },
  { label: 'Mar', value: 550 },
  { label: 'Apr', value: 800 },
  { label: 'May', value: 580 },
  { label: 'Jun', value: 900 },
  { label: 'Jul', value: 700 },
  { label: 'Aug', value: 750 },
  { label: 'Sep', value: 720 },
  { label: 'Oct', value: 800 },
  { label: 'Nov', value: 900 },
  { label: 'Dec', value: 680 },
]

const purchaseRateData = [
  { label: 'Jan', value: 750 },
  { label: 'Feb', value: 930 },
  { label: 'Mar', value: 550 },
  { label: 'Apr', value: 800 },
  { label: 'May', value: 580 },
  { label: 'Jun', value: 800 },
  { label: 'Jul', value: 700 },
  { label: 'Aug', value: 750 },
  { label: 'Sep', value: 720 },
  { label: 'Oct', value: 800 },
  { label: 'Nov', value: 900 },
  { label: 'Dec', value: 680 },
]

type OpenPanel = 'activities' | 'agents' | 'location' | null

function Dashboard() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null)

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
            title="Rent Rate"
            chips={['2024', 'Year']}
            data={rentRateData}
            unit="Properties Rented"
            className="w-full xl:w-[808px]"
          />
          <PropertyBreakdownCard />
        </div>

        <div className="flex flex-col gap-5 xl:flex-row">
          <TotalTrafficCard />
          <BarChartCard
            title="Purchase Rate"
            chips={['Year']}
            data={purchaseRateData}
            unit="Customer Purchased"
            defaultActiveIndex={5}
            className="w-full xl:w-[808px]"
          />
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
