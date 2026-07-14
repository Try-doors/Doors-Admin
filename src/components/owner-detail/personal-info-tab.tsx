import { useEffect, useState } from 'react'
import { Eye, Upload } from 'lucide-react'

import { UserTypeBadge } from '#/components/owners/user-type-badge'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import type { Owner } from '#/components/owners/owners-table'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

function fileExtension(name: string) {
  const parts = name.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE'
}

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

type PersonalInfoTabProps = {
  owner: Owner
  onSave: (updates: Partial<Owner>) => void
}

export function PersonalInfoTab({ owner, onSave }: PersonalInfoTabProps) {
  const isBusiness = owner.userType === 'Business'
  const fallbackAddress = '56 Akindele Crescent, Lagos'
  const fallbackIdNumber = isBusiness ? 'RC-1234567' : '112233445566'
  const fallbackKycFile = {
    name: `${owner.name} ${isBusiness ? 'CAC Certificate' : 'Passport'}.jpg`,
    size: '200kb',
  }

  const [idNumber, setIdNumber] = useState(owner.idNumber ?? fallbackIdNumber)
  const [phone, setPhone] = useState(owner.phone)
  const [name, setName] = useState(owner.name)
  const [email, setEmail] = useState(owner.email)
  const [address, setAddress] = useState(owner.address ?? fallbackAddress)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setIdNumber(owner.idNumber ?? fallbackIdNumber)
    setPhone(owner.phone)
    setName(owner.name)
    setEmail(owner.email)
    setAddress(owner.address ?? fallbackAddress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner.id])

  const kycFile = owner.kycFile ?? fallbackKycFile

  function handleSave() {
    onSave({ idNumber, phone, name, email, address })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[18px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
        Personal Information
      </h2>

      <div className="flex flex-col gap-3">
        <div className="relative size-24">
          <div
            className="flex size-24 items-center justify-center rounded-full text-[24px] font-medium text-white"
            style={{ backgroundColor: owner.avatarColor }}
          >
            {initials(owner.name)}
          </div>
          <div className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-black/70 text-white">
            <Upload className="size-3.5" strokeWidth={1.75} />
          </div>
        </div>
        <UserTypeBadge type={owner.userType} />
      </div>

      <div className="rounded-2xl bg-white p-6">
        <h3 className="mb-5 text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          Other Information
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>{isBusiness ? 'CAC Number' : 'NIN Number'}</Label>
            <Input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>{isBusiness ? 'Business Name' : 'Legal Name'}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>Email Address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className={inputClassName} />
          </div>
          <div className="flex flex-col gap-1">
            <Label className={labelClassName}>
              {isBusiness ? 'Office address' : 'Current residential address'}
            </Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClassName} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6">
        <h3 className="mb-5 text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">
          KYC Information
        </h3>
        <div className="flex items-center gap-3 rounded-xl border border-[#E2E4E9] p-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED] text-[9px] font-bold text-white">
            {fileExtension(kycFile.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-[#0A0D14]">{kycFile.name}</p>
            <p className="text-[12px] text-[#868C98]">{kycFile.size} - Uploaded</p>
          </div>
          <button type="button" className="text-[#525866] hover:text-[#0A0D14]" aria-label="View file">
            <Eye className="size-5" strokeWidth={1.75} />
          </button>
          <button type="button" className="text-[#2B59FF] hover:text-[#2B59FF]/80" aria-label="Replace file">
            <Upload className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-fit rounded-full bg-[#2B59FF] px-6 py-3 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
      >
        {saved ? 'Saved' : 'Save Changes'}
      </button>
    </div>
  )
}
