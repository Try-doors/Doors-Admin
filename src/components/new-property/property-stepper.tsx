import { Check } from 'lucide-react'

const steps = ['Property Information', 'Photos', 'Amenities', 'Video', 'Preview']

export function PropertyStepper({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="mx-auto flex w-[1080px] max-w-full items-start px-6">
      {steps.map((label, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === steps.length - 1

        return (
          <div key={label} className={'flex flex-col gap-2 ' + (isLast ? 'items-end shrink-0' : 'flex-1')}>
            <div className="flex h-6 w-full items-center">
              {isCompleted ? (
                <div className="z-[2] -mr-px flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2970FF]">
                  <Check className="size-4 text-white" strokeWidth={3} />
                </div>
              ) : isCurrent ? (
                <div className="z-[2] -mr-px flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#2970FF] bg-white">
                  <div className="size-2 rounded-full bg-[#2970FF]" />
                </div>
              ) : (
                <div className="z-[2] -mr-px size-3 shrink-0 rounded-full bg-[#CDD0D5]" />
              )}
              {!isLast && (
                <div
                  className={
                    'z-[1] h-[3px] flex-1 ' + (isCompleted ? 'bg-[#2970FF]' : 'bg-[#E2E4E9]')
                  }
                />
              )}
            </div>
            <p
              className={
                'text-[12px] font-medium whitespace-nowrap ' +
                (isCompleted ? 'text-[#2B59FF]' : isCurrent ? 'text-[#0A0D14]' : 'text-[#525866]')
              }
            >
              {label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
