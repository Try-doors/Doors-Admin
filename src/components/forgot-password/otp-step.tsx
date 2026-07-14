import { useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'

import emailSentIllustration from '#/assets/email-sent-illustration.png'

type OtpStepProps = {
  email: string
  onVerify: () => void
}

function OtpBox({
  value,
  onChange,
  onKeyDown,
  inputRef,
}: {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef: (el: HTMLInputElement | null) => void
}) {
  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(-1))}
      onKeyDown={onKeyDown}
      inputMode="numeric"
      maxLength={1}
      className="h-12 w-10 rounded-[10px] border border-[#E2E4E9] text-center text-[24px] font-semibold tracking-[-0.36px] text-[#0C111D] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] focus:border-[#2B59FF] focus:outline-none"
    />
  )
}

export function OtpStep({ email, onVerify }: OtpStepProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const [resent, setResent] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const code = digits.join('')
  const canVerify = code.length === 6

  function setDigit(index: number, value: string) {
    setDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleResend() {
    setDigits(Array(6).fill(''))
    setResent(true)
    inputRefs.current[0]?.focus()
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <>
      <img src={emailSentIllustration} alt="" className="h-[150px] w-[200px] object-contain" />

      <div className="flex w-full flex-col items-center gap-[31px]">
        <div className="flex w-[300px] flex-col items-center gap-2 text-center">
          <h1 className="font-['DM_Sans',sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-1px] text-[#0C111D]">
            Email Sent
          </h1>
          <p className="text-[14px] leading-[1.6] tracking-[-0.084px] text-[#525866]">
            A verification code has been sent to{' '}
            <span className="font-medium text-[#20232D]">{email}</span>
          </p>
        </div>

        <form
          className="flex w-full flex-col items-center gap-[26px]"
          onSubmit={(e) => {
            e.preventDefault()
            if (canVerify) onVerify()
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <OtpBox
                  key={i}
                  value={digits[i]}
                  onChange={(v) => setDigit(i, v)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputRef={(el) => {
                    inputRefs.current[i] = el
                  }}
                />
              ))}
            </div>
            <span className="h-px w-3 bg-[#CDD0D5]" />
            <div className="flex items-center gap-2">
              {[3, 4, 5].map((i) => (
                <OtpBox
                  key={i}
                  value={digits[i]}
                  onChange={(v) => setDigit(i, v)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputRef={(el) => {
                    inputRefs.current[i] = el
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <button
              type="submit"
              disabled={!canVerify}
              className="h-auto w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Verify Email
            </button>
            <p className="text-[14px] font-medium tracking-[-0.084px] text-[#31353F]">
              {resent ? (
                'Code resent!'
              ) : (
                <>
                  Didn&apos;t receive the code.{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="!text-[#2970FF] underline"
                  >
                    Resend Code
                  </button>
                </>
              )}
            </p>
          </div>
        </form>
      </div>

      <Link
        to="/sign-in"
        className="text-[14px] font-medium tracking-[-0.084px] !text-[#2970FF] no-underline hover:underline"
      >
        Back to Login
      </Link>
    </>
  )
}
