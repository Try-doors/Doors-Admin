import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { OwnerTypeRadio } from '#/components/new-owner/owner-type-radio'
import type { UserType as OwnerType } from '#/components/owners/user-type-badge'

type PersonalInformationStepProps = {
  ownerType: OwnerType
  onOwnerTypeChange: (type: OwnerType) => void
  name: string
  onNameChange: (value: string) => void
  email: string
  onEmailChange: (value: string) => void
  address: string
  onAddressChange: (value: string) => void
  phone: string
  onPhoneChange: (value: string) => void
}

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

export function PersonalInformationStep({
  ownerType,
  onOwnerTypeChange,
  name,
  onNameChange,
  email,
  onEmailChange,
  address,
  onAddressChange,
  phone,
  onPhoneChange,
}: PersonalInformationStepProps) {
  const isBusiness = ownerType === 'Business'

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
          Personal Information
        </h1>
        <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
          Add a new property owner to the database
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 border-b border-transparent pb-4">
          <p className={labelClassName}>Owner Type</p>
          <div className="flex flex-wrap gap-4">
            <OwnerTypeRadio
              label="Individual"
              selected={!isBusiness}
              onSelect={() => onOwnerTypeChange('Individual')}
            />
            <OwnerTypeRadio
              label="Business"
              selected={isBusiness}
              onSelect={() => onOwnerTypeChange('Business')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className={labelClassName}>
            {isBusiness ? 'Business Name' : 'Legal Name'}
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={isBusiness ? 'Enter Business Name' : 'Enter Legal Name'}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className={labelClassName}>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter email address"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="address" className={labelClassName}>
            {isBusiness ? 'Office address' : 'Current residential address'}
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="Enter Address"
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="phone" className={labelClassName}>
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Enter Location"
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  )
}
