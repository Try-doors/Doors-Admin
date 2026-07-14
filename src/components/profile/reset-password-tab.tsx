import { useState } from 'react'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { isPasswordValid, PasswordStrengthMeter } from '#/components/shared/password-strength-meter'

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

export function ResetPasswordTab({ onSaved }: { onSaved: () => void }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const canSubmit =
    oldPassword.length > 0 &&
    isPasswordValid(newPassword) &&
    newPassword === confirmPassword &&
    confirmPassword.length > 0

  function handleSubmit() {
    if (!canSubmit) return
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onSaved()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Reset Password</h2>

      <div className="flex flex-col items-start gap-8 rounded-2xl bg-white px-6 pt-6">
        <div className="flex w-[400px] flex-col gap-1">
          <Label className={labelClassName}>Old Password</Label>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="flex w-[400px] flex-col gap-1">
          <Label className={labelClassName}>New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClassName}
          />
          <PasswordStrengthMeter password={newPassword} />
        </div>

        <div className="flex w-[400px] flex-col gap-1">
          <Label className={labelClassName}>Confirm New Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClassName}
          />
          {confirmPassword.length > 0 && confirmPassword !== newPassword && (
            <p className="text-[12px] text-[#DF1C41]">Passwords do not match</p>
          )}
        </div>

        <div className="flex w-full flex-col items-start border-t border-[#E2E4E9] py-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-full bg-[#2B59FF] px-4 py-2 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}
