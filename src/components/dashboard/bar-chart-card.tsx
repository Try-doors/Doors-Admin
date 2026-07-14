import { useState } from 'react'

import { FilterChip } from '#/components/dashboard/filter-chip'

const Y_AXIS_LABELS = ['1000', '800', '600', '400', '200', '100', '50', '0']

type BarDatum = {
  label: string
  value: number
}

type BarChartCardProps = {
  title: string
  chips: string[]
  data: BarDatum[]
  unit: string
  defaultActiveIndex?: number
  className?: string
}

export function BarChartCard({
  title,
  chips,
  data,
  unit,
  defaultActiveIndex,
  className,
}: BarChartCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(defaultActiveIndex)

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

      <div className="flex flex-1 gap-2">
        <div className="flex h-[256px] flex-col justify-between text-right text-[12px] text-[#868C98]">
          {Y_AXIS_LABELS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="relative flex flex-1 flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[256px] flex-col justify-between">
            {Y_AXIS_LABELS.map((tick) => (
              <div key={tick} className="h-px w-full bg-[#F2F4F7]" />
            ))}
          </div>

          <div className="flex h-[256px] items-end gap-4 px-6 md:gap-6">
            {data.map((bar, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={bar.label}
                  className="relative flex h-full flex-1 items-end justify-center"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(defaultActiveIndex)}
                >
                  {isActive && (
                    <div className="absolute -top-[42px] left-1/2 z-10 w-max -translate-x-1/2">
                      <div className="rounded-md bg-[#20232D] px-2.5 py-1 text-[14px] tracking-[-0.084px] text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12),0px_1px_2px_0px_rgba(228,229,231,0.24)]">
                        <p className="font-medium leading-[1.6]">{bar.label}</p>
                        <p className="whitespace-nowrap leading-5">
                          {bar.value} {unit}
                        </p>
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      'w-full rounded-t-[3px] transition-colors ' +
                      (isActive ? 'bg-[#2B59FF]' : 'bg-[#93B5FA]')
                    }
                    style={{ height: `${(bar.value / 1000) * 100}%` }}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-2.5 flex gap-4 px-6 text-center text-[12px] text-[#868C98] md:gap-6">
            {data.map((bar) => (
              <p key={bar.label} className="flex-1">
                {bar.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
