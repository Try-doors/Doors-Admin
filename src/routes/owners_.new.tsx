import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { formatSize } from '#/components/new-owner/file-upload'
import { KycStep } from '#/components/new-owner/kyc-step'
import { NewOwnerFooter } from '#/components/new-owner/new-owner-footer'
import { NewOwnerHeader } from '#/components/new-owner/new-owner-header'
import { PersonalInformationStep } from '#/components/new-owner/personal-information-step'
import { Stepper } from '#/components/new-owner/stepper'
import type { UserType } from '#/components/owners/user-type-badge'
import { useOwners } from '#/lib/owners-store'

export const Route = createFileRoute('/owners_/new')({ component: NewOwner })

function NewOwner() {
  const navigate = useNavigate()
  const { addOwner } = useOwners()

  const [step, setStep] = useState<1 | 2>(1)
  const [ownerType, setOwnerType] = useState<UserType>('Individual')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [file, setFile] = useState<File | null>(null)

  function goToOwners() {
    navigate({ to: '/owners' })
  }

  const step1Valid =
    name.trim() !== '' && email.trim() !== '' && address.trim() !== '' && phone.trim() !== ''
  const step2Valid = idNumber.trim() !== '' && file !== null

  function handleContinue() {
    if (!step1Valid) return
    setStep(2)
  }

  function handlePublish() {
    if (!step2Valid || !file) return
    addOwner({
      name,
      email,
      phone,
      userType: ownerType,
      address,
      idNumber,
      kycFile: { name: file.name, size: formatSize(file.size) },
    })
    goToOwners()
  }

  const stepLabels = [
    { label: ownerType === 'Business' ? 'Business Information' : 'Personal Information' },
    { label: 'KYC' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NewOwnerHeader onClose={goToOwners} />

      <div className="pt-8">
        <Stepper steps={stepLabels} currentIndex={step - 1} />
      </div>

      <div className="flex flex-1 justify-center px-6 pb-24 pt-14">
        <div className="w-full max-w-[461px]">
          {step === 1 ? (
            <PersonalInformationStep
              ownerType={ownerType}
              onOwnerTypeChange={setOwnerType}
              name={name}
              onNameChange={setName}
              email={email}
              onEmailChange={setEmail}
              address={address}
              onAddressChange={setAddress}
              phone={phone}
              onPhoneChange={setPhone}
            />
          ) : (
            <KycStep
              ownerType={ownerType}
              idNumber={idNumber}
              onIdNumberChange={setIdNumber}
              file={file}
              onFileChange={setFile}
            />
          )}
        </div>
      </div>

      <NewOwnerFooter
        onCancel={goToOwners}
        onPrimary={step === 1 ? handleContinue : handlePublish}
        primaryLabel={step === 1 ? 'Continue' : 'Publish'}
        primaryDisabled={step === 1 ? !step1Valid : !step2Valid}
        showArrow={step === 1}
      />
    </div>
  )
}
