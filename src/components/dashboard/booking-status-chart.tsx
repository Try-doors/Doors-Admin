import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

function statusLabel(status: string) {
  return status
    .split('_')
    .map((w) => w[0] + w.slice(1).toLowerCase())
    .join(' ')
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] leading-5 tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      {payload[0].value} · {statusLabel(payload[0].name)}
    </div>
  )
}

export function BookingStatusChart() {
  const { bookingStatusBreakdown, totalBookings } = useDashboardMetrics()

  return (
    <div className="flex h-[374px] w-full flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
        Booking Status Breakdown
      </p>

      {totalBookings === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No bookings yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bookingStatusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={62}
              outerRadius={89}
              paddingAngle={2}
              strokeWidth={0}
            >
              {bookingStatusBreakdown.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-[12px] text-[#0A0D14]">{statusLabel(String(value))}</span>
              )}
              iconType="circle"
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
