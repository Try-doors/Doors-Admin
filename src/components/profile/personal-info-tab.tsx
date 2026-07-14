import { useRef, useState } from 'react'

import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { initials, useProfile } from '#/lib/profile-store'

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

export function PersonalInfoTab({ onSaved }: { onSaved: () => void }) {
  const { profile, updateProfile } = useProfile()
  const inputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [address, setAddress] = useState(profile.address)
  const [phone, setPhone] = useState(profile.phone)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  function handleSave() {
    updateProfile({ name, email, address, phone })
    onSaved()
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[18px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
        Personal Information
      </h2>

      <div className="flex flex-col gap-6 rounded-2xl bg-white p-6">
        <div className="flex items-center gap-4">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="size-16 rounded-full object-cover" />
          ) : (
            <div
              className="flex size-16 items-center justify-center rounded-full text-[18px] font-medium text-white"
              style={{ backgroundColor: profile.avatarColor }}
            >
              {initials(profile.name)}
            </div>
          )}
          <div className="flex flex-col items-start gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22px] text-[#0A0D14]">
                Profile Photo
              </p>
              <p className="text-[12px] text-[#868C98]">
                Change profile picture to a size of 148 x 148 jpg or png
              </p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full bg-[#D5DEFF] px-4 py-1.5 text-[13px] font-medium text-[#2B59FF] hover:bg-[#D5DEFF]/80"
            >
              Upload Photo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setPhotoUrl(URL.createObjectURL(file))
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Legal Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Email Address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Current residential address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClassName} />
          </div>
        </div>

        <div className="border-t border-[#F2F4F7] pt-6">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
