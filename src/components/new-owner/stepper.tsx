import { Check } from 'lucide-react'

type Step = { label: string }

export function Stepper({ steps, currentIndex }: { steps: Step[]; currentIndex: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[508px] items-start px-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isLast = index === steps.length - 1
        return (
          <div key={step.label} className={'flex min-w-0 flex-col gap-2 ' + (isLast ? 'shrink-0' : 'flex-1')}>
            <div className="flex h-6 items-center gap-[3px]">
              {isCompleted ? (
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2970FF]">
                  <Check className="size-4 text-white" strokeWidth={3} />
                </div>
              ) : (
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#2970FF] bg-white">
                  <div className="size-2 rounded-full bg-[#2970FF]" />
                </div>
              )}
              {!isLast && (
                <div className={'h-[3px] flex-1 ' + (isCompleted ? 'bg-[#2970FF]' : 'bg-[#E2E4E9]')} />
              )}
            </div>
            <p
              className={
                'truncate text-[12px] font-medium ' +
                (isCompleted ? 'text-[#00359E]' : 'text-[#0A0D14]')
              }
            >
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
