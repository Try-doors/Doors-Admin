import { CircleCheck, CircleX } from 'lucide-react'

import { checkPasswordRequirements, passwordStrengthMeta } from '#/lib/password-strength'

function RequirementRow({ met, label }: { met: boolean; label: string }) {
  return (
    <div className="flex w-full items-center gap-1">
      {met ? (
        <CircleCheck className="size-4 shrink-0 text-[#17B26A]" strokeWidth={2} />
      ) : (
        <CircleX className="size-4 shrink-0 text-[#CDD0D5]" strokeWidth={2} />
      )}
      <p className="flex-1 text-[12px] leading-4 text-[#525866]">{label}</p>
    </div>
  )
}

export function PasswordStrengthMeter({ password }: { password: string }) {
  const requirements = checkPasswordRequirements(password)
  const metCount = Object.values(requirements).filter(Boolean).length
  const { strengthLabel, strengthColor } = passwordStrengthMeta(metCount)

  if (password.length === 0) return null

  return (
    <div className="flex flex-col gap-2 pt-1.5">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-[1.2px]"
            style={{ backgroundColor: i < metCount ? strengthColor : '#E2E4E9' }}
          />
        ))}
      </div>
      <p className="text-[12px] leading-4 text-[#525866]">
        {strengthLabel} password. Must contain at least;
      </p>
      <RequirementRow met={requirements.uppercase} label="At least 1 uppercase" />
      <RequirementRow met={requirements.number} label="At least 1 number" />
      <RequirementRow met={requirements.length} label="At least 8 characters" />
    </div>
  )
}

export function isPasswordValid(password: string) {
  const requirements = checkPasswordRequirements(password)
  return Object.values(requirements).every(Boolean)
}
