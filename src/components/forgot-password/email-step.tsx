import { Link } from '@tanstack/react-router'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

type EmailStepProps = {
  email: string
  onEmailChange: (email: string) => void
  onContinue: () => void
}

export function EmailStep({ email, onEmailChange, onContinue }: EmailStepProps) {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="font-['DM_Sans',sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-1px] text-[#0C111D]">
          Forgot Password
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.084px] text-[#525866]">
          Continue to your doors account
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-[26px]"
        onSubmit={(e) => {
          e.preventDefault()
          if (email.trim() !== '') onContinue()
        }}
      >
        <div className="flex w-full flex-col items-start gap-1">
          <Label
            htmlFor="email"
            className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter Email Address"
            className="h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]"
          />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <button
            type="submit"
            disabled={email.trim() === ''}
            className="h-auto w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
          <Link
            to="/sign-in"
            className="text-[14px] font-medium tracking-[-0.084px] !text-[#2970FF] no-underline hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </>
  )
}
