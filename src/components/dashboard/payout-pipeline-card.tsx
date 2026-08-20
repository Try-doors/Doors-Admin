import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useDashboardMetrics } from '#/lib/use-dashboard-metrics'

function formatNaira(amount: number) {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: { label: string; count: number; amount: number } }[]
}) {
  if (!active || !payload || payload.length === 0) return null
  const d = payload[0].payload
  return (
    <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] leading-5 tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      <p className="font-medium">{d.label}</p>
      <p className="whitespace-nowrap">
        {d.count} booking{d.count === 1 ? '' : 's'} · {formatNaira(d.amount)}
      </p>
    </div>
  )
}

export function PayoutPipelineCard() {
  const { payoutBreakdown } = useDashboardMetrics()
  const totalInPipeline = payoutBreakdown.reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="flex h-[374px] w-full flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">Payout Pipeline</p>
        <p className="text-[14px] font-medium text-[#0A0D14]">{formatNaira(totalInPipeline)}</p>
      </div>

      {payoutBreakdown.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-center text-[14px] text-[#868C98]">
          No bookings yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={payoutBreakdown} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              width={80}
              tick={{ fill: '#525866', fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: '#F5F8FF' }} content={<ChartTooltip />} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {payoutBreakdown.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
