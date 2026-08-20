import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { FilterChip } from '#/components/dashboard/filter-chip'

type BarDatum = {
  label: string
  value: number
}

type BarChartCardProps = {
  title: string
  chips: string[]
  data: BarDatum[]
  unit: string
  className?: string
}

function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean
  payload?: { value: number }[]
  label?: string
  unit: string
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
      <p className="font-medium leading-[1.6]">{label}</p>
      <p className="whitespace-nowrap leading-5">
        {payload[0].value.toLocaleString()} {unit}
      </p>
    </div>
  )
}

export function BarChartCard({ title, chips, data, unit, className }: BarChartCardProps) {
  const hasData = data.some((d) => d.value > 0)

  return (
    <div
      className={
        'flex h-[374px] flex-col gap-4 rounded-lg border border-[#E2E4E9] bg-white p-6 ' +
        (className ?? '')
      }
    >
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">{title}</p>
        <div className="flex items-center gap-2">
          {chips.map((chip) => (
            <FilterChip key={chip} label={chip} />
          ))}
        </div>
      </div>

      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#F2F4F7" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#868C98', fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#868C98', fontSize: 12 }} width={36} />
            <Tooltip cursor={{ fill: '#F5F8FF' }} content={<ChartTooltip unit={unit} />} />
            <Bar dataKey="value" fill="#93B5FA" radius={[3, 3, 0, 0]} activeBar={{ fill: '#2B59FF' }} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-1 items-center justify-center text-[14px] text-[#868C98]">
          No data for this period yet
        </div>
      )}
    </div>
  )
}
