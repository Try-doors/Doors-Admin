import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

const COLORS = ['#4A1FB8', '#F670C7', '#FEC84B', '#2B59FF', '#079455']

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] leading-5 tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      {payload[0].value}
      <br />
      {payload[0].name}
    </div>
  )
}

export function PropertyBreakdownCard() {
  const { propertyTypeBreakdown, totalProperties } = useDashboardMetrics()

  return (
    <div className="flex h-[374px] w-full shrink-0 flex-col gap-9 rounded-lg border border-[#E2E4E9] bg-white p-5 xl:w-[256px]">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
        Property Breakdown
      </p>

      {totalProperties === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No properties yet
        </div>
      ) : (
        <div className="flex flex-col items-center gap-9">
          <div className="relative size-[179px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeBreakdown}
                  dataKey="count"
                  nameKey="type"
                  innerRadius={62}
                  outerRadius={89}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {propertyTypeBreakdown.map((entry, index) => (
                    <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-[24px] flex flex-col items-center justify-center rounded-full bg-white text-center">
              <p className="text-[14px] tracking-[-0.084px] text-[#525866]">Total Property</p>
              <p className="text-[18px] font-semibold tracking-[-0.27px] text-[#0A0D14]">
                {totalProperties}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {propertyTypeBreakdown.map((entry, index) => (
              <div key={entry.type} className="flex items-center gap-2">
                <div
                  className="size-3 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <p className="text-[12px] text-[#0A0D14]">
                  {entry.type} ({entry.count})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
