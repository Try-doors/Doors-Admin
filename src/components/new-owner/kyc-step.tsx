import { FileUpload } from '#/components/new-owner/file-upload'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import type { UserType as OwnerType } from '#/components/owners/user-type-badge'

type KycStepProps = {
  ownerType: OwnerType
  idNumber: string
  onIdNumberChange: (value: string) => void
  file: File | null
  onFileChange: (file: File | null) => void
}

const inputClassName =
  'h-auto rounded-[10px] border-[#E2E4E9] p-3 text-[14px] shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] placeholder:text-[#868C98]'
const labelClassName = 'text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]'

export function KycStep({ ownerType, idNumber, onIdNumberChange, file, onFileChange }: KycStepProps) {
  const isBusiness = ownerType === 'Business'

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
          KYC Information
        </h1>
        <p className="text-[14px] tracking-[-0.084px] text-[#525866]">
          Add a new property owner to the database
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="idNumber" className={labelClassName}>
            {isBusiness ? 'CAC Number' : 'NIN Number'}
          </Label>
          <Input
            id="idNumber"
            value={idNumber}
            onChange={(e) => onIdNumberChange(e.target.value)}
            placeholder="Enter number here..."
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className={labelClassName}>{isBusiness ? 'CAC Documents' : 'National ID/Passport'}</p>
          <FileUpload value={file} onChange={onFileChange} />
        </div>
      </div>
    </div>
  )
}
