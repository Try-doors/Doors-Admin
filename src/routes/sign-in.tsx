import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import doorsLogoMark from '#/assets/doors-logo-mark.svg'

export const Route = createFileRoute('/sign-in')({ component: SignIn })

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full bg-white font-['Inter',sans-serif]">
      <div className="absolute left-1/2 top-[35px] flex -translate-x-1/2 items-center gap-[4.66px]">
        <img src={doorsLogoMark} alt="" className="h-[17px] w-[17px]" />
        <p className="text-[23px] font-semibold tracking-[-0.93px] text-black">doors</p>
      </div>

      <div className="absolute left-1/2 top-1/2 flex w-[380px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[31px]">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="font-['DM_Sans',sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-1px] text-[#0C111D]">
            Sign In
          </h1>
          <p className="text-[14px] leading-[1.6] tracking-[-0.084px] text-[#525866]">
            Continue to your doors account
          </p>
        </div>

        <form
          className="flex w-full flex-col items-start gap-[26px]"
          onSubmit={(e) => {
            e.preventDefault()
            navigate({ to: '/dashboard' })
          }}
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col items-start gap-1">
              <Label
                htmlFor="email"
                className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter email address"
                className="h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]"
              />
            </div>
            <div className="flex w-full flex-col items-start gap-1">
              <Label
                htmlFor="password"
                className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]"
              >
                Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="h-auto rounded-[10px] border-[#E2E4E9] p-3 pr-10 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868C98] hover:text-[#525866]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4">
            <Button
              type="submit"
              className="h-auto w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
            >
              Sign In
            </Button>
            <Link
              to="/forgot-password"
              className="text-[14px] font-medium tracking-[-0.084px] !text-[#2970FF] no-underline hover:underline"
            >
              Forgot Password ?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
