import { useOwners } from '#/lib/owners-store'
import type { PropertyStatus } from '#/lib/properties-store'
import type { PhotoItem } from '#/components/new-property/photos-step'
import type { VideoItem } from '#/components/new-property/video-step'
import type { PropertyFormData } from '#/routes/properties_.new'

type PreviewStepProps = {
  data: PropertyFormData
  photos: PhotoItem[]
  videos: VideoItem[]
  status: PropertyStatus
  onStatusChange: (status: PropertyStatus) => void
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[12px] text-[#868C98]">{label}</p>
      <p className="text-[14px] font-medium text-[#0A0D14]">{value || '—'}</p>
    </div>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <p className="text-[16px] font-semibold tracking-[-0.176px] text-[#0A0D14]">{children}</p>
}

function PlaceholderBlock() {
  return (
    <div
      className="h-32 w-full rounded-xl"
      style={{
        backgroundImage:
          'linear-gradient(45deg, #F2F4F7 25%, transparent 25%), linear-gradient(-45deg, #F2F4F7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #F2F4F7 75%), linear-gradient(-45deg, transparent 75%, #F2F4F7 75%)',
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      }}
    />
  )
}

export function PreviewStep({ data, photos, videos, status, onStatusChange }: PreviewStepProps) {
  const { activeOwners } = useOwners()
  const owner = activeOwners.find((o) => o.id === data.ownerId)

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Preview</h1>
        <p className="text-[14px] tracking-[-0.084px] text-[#525866]">Summary of all the infos</p>
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Property Information</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Property Name" value={data.name} />
          <Field label="Property Type" value={data.type} />
        </div>
        <Field label="Property Description" value={data.description} />
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Location</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Country" value={data.country} />
          <Field label="State" value={data.state} />
          <Field label="City" value={data.city} />
          <Field label="Local government" value={data.localGovernment} />
          <Field label="Zip code" value={data.zipcode} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Details</SectionTitle>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Bedroom" value={String(data.bedroom)} />
          <Field label="Sitting Room" value={String(data.sittingRoom)} />
          <Field label="Kitchen" value={String(data.kitchen)} />
          <Field label="Bathroom" value={String(data.bathroom)} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Photos</SectionTitle>
        {photos.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${photo.url})` }}
              />
            ))}
          </div>
        ) : (
          <PlaceholderBlock />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Video</SectionTitle>
        {videos.length > 0 ? (
          <div className="flex flex-col gap-2">
            {videos.map((video) => (
              <p key={video.id} className="text-[14px] text-[#0A0D14]">
                {video.name} · {video.size}
              </p>
            ))}
          </div>
        ) : (
          <PlaceholderBlock />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Plan</SectionTitle>
        <PlaceholderBlock />
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle>Configure Property</SectionTitle>

        <div>
          <p className="text-[12px] text-[#868C98]">Property Owner</p>
          {owner ? (
            <div className="mt-1 flex items-center gap-1.5">
              <div
                className="flex size-6 items-center justify-center rounded-full text-[10px] font-medium text-white"
                style={{ backgroundColor: owner.avatarColor }}
              >
                {owner.name
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <p className="text-[14px] font-medium text-[#0A0D14]">{owner.name}</p>
            </div>
          ) : (
            <p className="text-[14px] font-medium text-[#0A0D14]">—</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">Status</p>
          <div className="flex w-fit rounded-lg bg-[#F6F8FA] p-1">
            <button
              type="button"
              onClick={() => onStatusChange('RENT')}
              className={
                'rounded-md px-3 py-1 text-[14px] font-medium ' +
                (status === 'RENT' ? 'bg-white text-[#0A0D14] shadow-sm' : 'text-[#868C98]')
              }
            >
              Rent
            </button>
            <button
              type="button"
              onClick={() => onStatusChange('PURCHASE')}
              className={
                'rounded-md px-3 py-1 text-[14px] font-medium ' +
                (status === 'PURCHASE' ? 'bg-white text-[#0A0D14] shadow-sm' : 'text-[#868C98]')
              }
            >
              Purchase
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1 text-[12px] text-[#868C98]">3D view</p>
          <PlaceholderBlock />
        </div>
      </div>
    </div>
  )
}
