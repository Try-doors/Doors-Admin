import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { AmenitiesStep } from '#/components/new-property/amenities-step'
import { NewPropertyFooter } from '#/components/new-property/new-property-footer'
import { NewPropertyHeader } from '#/components/new-property/new-property-header'
import type { PhotoItem } from '#/components/new-property/photos-step'
import { PhotosStep } from '#/components/new-property/photos-step'
import { PreviewStep } from '#/components/new-property/preview-step'
import { PropertyInformationStep } from '#/components/new-property/property-information-step'
import { PropertyStepper } from '#/components/new-property/property-stepper'
import { SuccessModal } from '#/components/new-property/success-modal'
import type { VideoItem } from '#/components/new-property/video-step'
import { VideoStep } from '#/components/new-property/video-step'
import { useOwners } from '#/lib/owners-store'
import { useProperties, type PropertyStatus } from '#/lib/properties-store'

export const Route = createFileRoute('/properties_/new')({ component: NewProperty })

export type PropertyFormData = {
  name: string
  ownerId: string
  type: string
  description: string
  country: string
  state: string
  city: string
  localGovernment: string
  zipcode: string
  bedroom: number
  sittingRoom: number
  kitchen: number
  bathroom: number
}

const initialFormData: PropertyFormData = {
  name: '',
  ownerId: '',
  type: 'Duplex',
  description: '',
  country: '',
  state: '',
  city: '',
  localGovernment: '',
  zipcode: '',
  bedroom: 2,
  sittingRoom: 2,
  kitchen: 2,
  bathroom: 2,
}

const STEP_COUNT = 5

function NewProperty() {
  const navigate = useNavigate()
  const { activeOwners } = useOwners()
  const { addProperty } = useProperties()

  const [step, setStep] = useState(0)
  const [data, setData] = useState<PropertyFormData>(initialFormData)
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [amenities, setAmenities] = useState<Set<string>>(new Set())
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [status, setStatus] = useState<PropertyStatus>('RENT')
  const [published, setPublished] = useState(false)

  function goToProperties() {
    navigate({ to: '/properties' })
  }

  function updateData(updates: Partial<PropertyFormData>) {
    setData((prev) => ({ ...prev, ...updates }))
  }

  function handleBack() {
    if (step === 0) {
      goToProperties()
      return
    }
    setStep((s) => s - 1)
  }

  function handleContinue() {
    if (step === STEP_COUNT - 1) {
      const owner = activeOwners.find((o) => o.id === data.ownerId)
      addProperty({
        name: data.name || 'New Property',
        status,
        type: data.type,
        country: data.country,
        beds: data.bedroom,
        baths: data.bathroom,
        garages: 1,
        ownerId: data.ownerId,
        ownerName: owner?.name,
        ownerAvatarColor: owner?.avatarColor,
        description: data.description,
        state: data.state,
        city: data.city,
        localGovernment: data.localGovernment,
        zipcode: data.zipcode,
        sittingRoom: data.sittingRoom,
        kitchen: data.kitchen,
        amenities: Array.from(amenities),
        photos,
      })
      setPublished(true)
      return
    }
    setStep((s) => s + 1)
  }

  const step1Valid = data.name.trim() !== '' && data.ownerId !== '' && data.country.trim() !== ''
  const continueDisabled = step === 0 ? !step1Valid : false

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NewPropertyHeader onClose={goToProperties} />

      <div className="pt-8">
        <PropertyStepper currentIndex={step} />
      </div>

      <div className="flex flex-1 justify-center px-6 pb-24 pt-14">
        <div className="w-full max-w-[461px]">
          {step === 0 && <PropertyInformationStep data={data} onChange={updateData} />}
          {step === 1 && <PhotosStep photos={photos} onChange={setPhotos} />}
          {step === 2 && <AmenitiesStep selected={amenities} onChange={setAmenities} />}
          {step === 3 && <VideoStep videos={videos} onChange={setVideos} />}
          {step === 4 && (
            <PreviewStep
              data={data}
              photos={photos}
              videos={videos}
              status={status}
              onStatusChange={setStatus}
            />
          )}
        </div>
      </div>

      <NewPropertyFooter
        onBack={handleBack}
        onSaveExit={goToProperties}
        onContinue={handleContinue}
        continueDisabled={continueDisabled}
      />

      {published && <SuccessModal onContinue={goToProperties} />}
    </div>
  )
}
