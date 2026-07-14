const segments = [
  { label: 'Vacant', color: '#4A1FB8', percent: 45 },
  { label: 'Purchased', color: '#F670C7', percent: 30 },
  { label: 'Rented', color: '#FEC84B', percent: 25 },
]

const gradientStops = (() => {
  let cursor = 0
  return segments
    .map((segment) => {
      const start = cursor
      cursor += segment.percent
      return `${segment.color} ${start}% ${cursor}%`
    })
    .join(', ')
})()

export function PropertyBreakdownCard() {
  return (
    <div className="flex h-[374px] w-[256px] shrink-0 flex-col gap-9 rounded-lg border border-[#E2E4E9] bg-white p-5">
      <p className="text-[16px] font-medium tracking-[-0.176px] text-[#0A0D14]">
        Property Breakdown
      </p>

      <div className="flex flex-col items-center gap-9">
        <div className="relative size-[179px]">
          <div
            className="size-full rounded-full"
            style={{ background: `conic-gradient(${gradientStops})` }}
          />
          <div className="absolute inset-[24px] flex flex-col items-center justify-center rounded-full bg-white text-center">
            <p className="text-[14px] tracking-[-0.084px] text-[#525866]">Total Property</p>
            <p className="text-[18px] font-semibold tracking-[-0.27px] text-[#0A0D14]">548</p>
          </div>

          <div className="absolute -right-4 top-6 flex flex-col items-start">
            <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] leading-5 tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
              22
              <br />
              vacant
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {['Vacant', 'Rented', 'Purchased'].map((label) => {
            const segment = segments.find((s) => s.label === label)!
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="size-3 rounded"
                  style={{ backgroundColor: segment.color }}
                />
                <p className="text-[12px] text-[#0A0D14]">{label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
