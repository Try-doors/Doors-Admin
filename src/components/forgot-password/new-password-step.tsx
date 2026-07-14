import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { isPasswordValid, PasswordStrengthMeter } from '#/components/shared/password-strength-meter'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import newPasswordIllustration from '#/assets/new-password-illustration.png'

export function NewPasswordStep({ onSave }: { onSave: () => void }) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const canSave =
    isPasswordValid(newPassword) && newPassword === confirmPassword && confirmPassword.length > 0

  return (
    <>
      <img src={newPasswordIllustration} alt="" className="h-[150px] w-[146px] object-contain" />

      <div className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="font-['DM_Sans',sans-serif] text-[32px] font-semibold leading-[40px] tracking-[-1px] text-[#0C111D]">
          New Password
        </h1>
        <p className="text-[14px] leading-[1.6] tracking-[-0.084px] text-[#525866]">
          Continue to your doors account
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-[26px]"
        onSubmit={(e) => {
          e.preventDefault()
          if (canSave) onSave()
        }}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col items-start gap-1">
            <Label
              htmlFor="new-password"
              className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]"
            >
              New Password
            </Label>
            <div className="relative w-full">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-auto rounded-[10px] border-[#E2E4E9] p-3 pr-10 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868C98] hover:text-[#525866]"
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            <PasswordStrengthMeter password={newPassword} />
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <Label
              htmlFor="confirm-password"
              className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]"
            >
              Confirm New Password
            </Label>
            <div className="relative w-full">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-auto rounded-[10px] border-[#E2E4E9] p-3 pr-10 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#868C98] hover:text-[#525866]"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            {confirmPassword.length > 0 && confirmPassword !== newPassword && (
              <p className="text-[12px] text-[#DF1C41]">Passwords do not match</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className="h-auto w-full rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save Password
        </button>
      </form>
    </>
  )
}
