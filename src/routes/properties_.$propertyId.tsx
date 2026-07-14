import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { DeletePropertyModal } from '#/components/properties/delete-property-modal'
import { AmenitiesTab } from '#/components/property-detail/amenities-tab'
import { DiscardChangesModal } from '#/components/property-detail/discard-changes-modal'
import { PhotosMediaTab } from '#/components/property-detail/photos-media-tab'
import type { PropertyDetailFormData } from '#/components/property-detail/property-information-tab'
import { PropertyInformationTab } from '#/components/property-detail/property-information-tab'
import { PropertyDetailTabs, type PropertyDetailTab } from '#/components/property-detail/property-detail-tabs'
import { SuccessToast } from '#/components/profile/success-toast'
import { useOwners } from '#/lib/owners-store'
import { useProperties, type PropertyPhoto } from '#/lib/properties-store'

export const Route = createFileRoute('/properties_/$propertyId')({ component: PropertyDetail })

function PropertyDetail() {
  const { propertyId } = Route.useParams()
  const navigate = useNavigate()
  const { activeOwners } = useOwners()
  const { properties, updateProperty, deleteProperty } = useProperties()

  const property = properties.find((p) => p.id === propertyId)

  function buildInitialData(): PropertyDetailFormData {
    if (!property) {
      return {
        name: '',
        ownerId: '',
        type: 'Duplex',
        description: '',
        country: '',
        state: '',
        city: '',
        localGovernment: '',
        zipcode: '',
        bedroom: 0,
        sittingRoom: 0,
        kitchen: 0,
        bathroom: 0,
        status: 'RENT',
      }
    }
    const owner = activeOwners.find((o) => o.name === property.ownerName)
    return {
      name: property.name,
      ownerId: property.ownerId ?? owner?.id ?? '',
      type: property.type,
      description: property.description ?? '',
      country: property.country,
      state: property.state ?? '',
      city: property.city ?? '',
      localGovernment: property.localGovernment ?? '',
      zipcode: property.zipcode ?? '',
      bedroom: property.beds,
      sittingRoom: property.sittingRoom ?? 0,
      kitchen: property.kitchen ?? 0,
      bathroom: property.baths,
      status: property.status,
    }
  }

  const [tab, setTab] = useState<PropertyDetailTab>('information')
  const [data, setData] = useState<PropertyDetailFormData>(buildInitialData)
  const [photos, setPhotos] = useState<PropertyPhoto[]>(property?.photos ?? [])
  const [amenities, setAmenities] = useState<Set<string>>(new Set(property?.amenities ?? []))
  const [videoUrl, setVideoUrl] = useState<string | null>(property?.videos?.[0]?.url ?? null)
  const [housePlanFile, setHousePlanFile] = useState<{ name: string; size: string } | null>(
    property?.housePlanFile ?? null,
  )
  const [threeDPlanUrl, setThreeDPlanUrl] = useState<string | null>(property?.threeDPlanUrl ?? null)

  const [dirty, setDirty] = useState(false)
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function goToProperties() {
    navigate({ to: '/properties' })
  }

  function handleBack() {
    if (dirty) {
      setShowDiscardModal(true)
      return
    }
    goToProperties()
  }

  function updateData(updates: Partial<PropertyDetailFormData>) {
    setData((prev) => ({ ...prev, ...updates }))
    setDirty(true)
  }

  function handleSave() {
    if (!property) return
    const owner = activeOwners.find((o) => o.id === data.ownerId)
    updateProperty(property.id, {
      name: data.name,
      type: data.type,
      description: data.description,
      country: data.country,
      state: data.state,
      city: data.city,
      localGovernment: data.localGovernment,
      zipcode: data.zipcode,
      beds: data.bedroom,
      sittingRoom: data.sittingRoom,
      kitchen: data.kitchen,
      baths: data.bathroom,
      status: data.status,
      ownerId: data.ownerId,
      ownerName: owner?.name ?? property.ownerName,
      ownerAvatarColor: owner?.avatarColor ?? property.ownerAvatarColor,
      amenities: Array.from(amenities),
      photos,
      videos: videoUrl ? [{ id: 'video-1', url: videoUrl }] : [],
      housePlanFile: housePlanFile ?? undefined,
      threeDPlanUrl: threeDPlanUrl ?? undefined,
    })
    setDirty(false)
    setToast('Changes Saved')
  }

  function confirmDelete() {
    if (!property) return
    deleteProperty(property.id)
    goToProperties()
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex w-fit items-center gap-1 text-[14px] font-medium text-[#2B59FF] hover:underline"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
          Back
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
            Property Details
          </h1>
          {toast && <SuccessToast message={toast} onDismiss={() => setToast(null)} />}
        </div>

        <PropertyDetailTabs tab={tab} onChange={setTab} />

        {!property ? (
          <p className="py-12 text-center text-[14px] text-[#525866]">Property not found.</p>
        ) : (
          <>
            {tab === 'information' && (
              <PropertyInformationTab data={data} onChange={updateData} />
            )}
            {tab === 'amenities' && (
              <AmenitiesTab
                selected={amenities}
                onChange={(next) => {
                  setAmenities(next)
                  setDirty(true)
                }}
              />
            )}
            {tab === 'media' && (
              <PhotosMediaTab
                photos={photos}
                onPhotosChange={(next) => {
                  setPhotos(next)
                  setDirty(true)
                }}
                videoUrl={videoUrl}
                onVideoChange={(url) => {
                  setVideoUrl(url)
                  setDirty(true)
                }}
                housePlanFile={housePlanFile}
                onHousePlanChange={(file) => {
                  setHousePlanFile(file)
                  setDirty(true)
                }}
                threeDPlanUrl={threeDPlanUrl}
                onThreeDPlanChange={(url) => {
                  setThreeDPlanUrl(url)
                  setDirty(true)
                }}
              />
            )}

            <div className="flex items-center gap-4 border-t border-[#F2F4F7] pt-6">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="rounded-full border border-[#E2E4E9] bg-white px-6 py-2.5 text-[14px] font-medium text-[#DF1C41] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-[#2B59FF] px-6 py-2.5 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>

      {showDiscardModal && (
        <DiscardChangesModal
          onCancel={() => setShowDiscardModal(false)}
          onConfirm={goToProperties}
        />
      )}

      {showDeleteModal && (
        <DeletePropertyModal onCancel={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
      )}
    </DashboardLayout>
  )
}
