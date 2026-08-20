const PALETTE = ['#2B59FF', '#93C5FD', '#C4B5FD', '#FDBA74', '#86EFAC']

type Segment = { label: string; value: number }

export function SplitBar({ title, segments }: { title: string; segments: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] font-medium text-[#0A0D14]">{title}</p>
      {total === 0 ? (
        <p className="text-[12px] text-[#868C98]">No data yet</p>
      ) : (
        <>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#F2F4F7]">
            {segments.map((s, i) =>
              s.value === 0 ? null : (
                <div
                  key={s.label}
                  style={{ width: `${(s.value / total) * 100}%`, backgroundColor: PALETTE[i % PALETTE.length] }}
                />
              ),
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {segments.map((s, i) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
                />
                <p className="text-[12px] text-[#525866]">
                  {s.label} · {s.value}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
