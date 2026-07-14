import { useRef, useState } from 'react'
import { CircleX, ImagePlus, MoreHorizontal, Pencil, Play, UploadCloud, Video as VideoIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { PropertyPhoto } from '#/lib/properties-store'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type HousePlanFile = { name: string; size: string }

type PhotosMediaTabProps = {
  photos: PropertyPhoto[]
  onPhotosChange: (photos: PropertyPhoto[]) => void
  videoUrl: string | null
  onVideoChange: (url: string | null) => void
  housePlanFile: HousePlanFile | null
  onHousePlanChange: (file: HousePlanFile | null) => void
  threeDPlanUrl: string | null
  onThreeDPlanChange: (url: string | null) => void
}

const roomSuggestions = ['Sitting Room', 'Kitchen', 'Bedroom', 'Toilet', 'Dining Room']

export function PhotosMediaTab({
  photos,
  onPhotosChange,
  videoUrl,
  onVideoChange,
  housePlanFile,
  onHousePlanChange,
  threeDPlanUrl,
  onThreeDPlanChange,
}: PhotosMediaTabProps) {
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const housePlanInputRef = useRef<HTMLInputElement>(null)
  const threeDInputRef = useRef<HTMLInputElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [housePlanDragOver, setHousePlanDragOver] = useState(false)

  function handlePhotoFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return
    const newPhotos: PropertyPhoto[] = files.map((file, index) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      room: roomSuggestions[(photos.length + index) % roomSuggestions.length],
    }))
    onPhotosChange([...photos, ...newPhotos])
  }

  function updateRoom(id: string, room: string) {
    onPhotosChange(photos.map((p) => (p.id === id ? { ...p, room } : p)))
  }

  function deletePhoto(id: string) {
    onPhotosChange(photos.filter((p) => p.id !== id))
  }

  function makeCover(id: string) {
    const photo = photos.find((p) => p.id === id)
    if (!photo) return
    onPhotosChange([photo, ...photos.filter((p) => p.id !== id)])
  }

  function handleHousePlanFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const file = fileList[0]
    onHousePlanChange({ name: file.name, size: formatSize(file.size) })
  }

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#E2E4E9] bg-white p-6">
      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Photos</p>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <PhotoTile
              key={photo.id}
              photo={photo}
              isCover={index === 0}
              editing={editingId === photo.id}
              onEdit={() => setEditingId(photo.id)}
              onSaveRoom={(room) => {
                updateRoom(photo.id, room)
                setEditingId(null)
              }}
              onDelete={() => deletePhoto(photo.id)}
              onMakeCover={() => makeCover(photo.id)}
              onReupload={() => photoInputRef.current?.click()}
            />
          ))}
          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#CDD0D5] text-[#525866] hover:bg-[#F9FAFB]"
          >
            <ImagePlus className="size-6" strokeWidth={1.5} />
            <span className="text-[14px] font-medium">Add More</span>
          </button>
        </div>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handlePhotoFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">Video</p>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center gap-1 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            <VideoIcon className="size-4" strokeWidth={1.75} />
            New Video
          </button>
        </div>
        {videoUrl ? (
          <div className="relative overflow-hidden rounded-xl bg-black">
            <video src={videoUrl} controls className="max-h-[360px] w-full" />
            <button
              type="button"
              onClick={() => onVideoChange(null)}
              className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white/90 text-[#31353F]"
              aria-label="Remove video"
            >
              <CircleX className="size-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="flex h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-[#CDD0D5] bg-[repeating-conic-gradient(#F2F4F7_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]">
              <Play className="size-5" strokeWidth={1.75} />
            </span>
          </button>
        )}
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onVideoChange(URL.createObjectURL(file))
            e.target.value = ''
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">House Plan</p>
        {housePlanFile ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#E2E4E9] p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF]">
              <UploadCloud className="size-5 text-[#2B59FF]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-[#0A0D14]">{housePlanFile.name}</p>
              <p className="text-[12px] text-[#868C98]">{housePlanFile.size}</p>
            </div>
            <button
              type="button"
              onClick={() => onHousePlanChange(null)}
              className="shrink-0 text-[#868C98] hover:text-[#525866]"
              aria-label="Remove house plan"
            >
              <CircleX className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setHousePlanDragOver(true)
            }}
            onDragLeave={() => setHousePlanDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setHousePlanDragOver(false)
              handleHousePlanFiles(e.dataTransfer.files)
            }}
            className={
              'flex flex-col items-center justify-center gap-5 rounded-xl border border-dashed p-8 ' +
              (housePlanDragOver ? 'border-[#2B59FF] bg-[#F5F8FF]' : 'border-[#CDD0D5]')
            }
          >
            <UploadCloud className="size-6 text-[#868C98]" strokeWidth={1.75} />
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]">
                Choose a file or drag &amp; drop it here.
              </p>
              <p className="text-[12px] text-[#868C98]">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
            </div>
            <button
              type="button"
              onClick={() => housePlanInputRef.current?.click()}
              className="rounded-lg border border-[#E2E4E9] bg-white px-4 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              Browse File
            </button>
          </div>
        )}
        <input
          ref={housePlanInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            handleHousePlanFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium tracking-[-0.27px] text-[#0C111D]">3D Plan</p>
          <button
            type="button"
            onClick={() => threeDInputRef.current?.click()}
            className="flex items-center gap-1 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            <UploadCloud className="size-4" strokeWidth={1.75} />
            3D Plan
          </button>
        </div>
        {threeDPlanUrl ? (
          <img src={threeDPlanUrl} alt="3D plan" className="max-h-[320px] w-fit rounded-xl object-contain" />
        ) : (
          <p className="text-[14px] text-[#868C98]">No 3D plan uploaded</p>
        )}
        <input
          ref={threeDInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onThreeDPlanChange(URL.createObjectURL(file))
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}

type PhotoTileProps = {
  photo: PropertyPhoto
  isCover: boolean
  editing: boolean
  onEdit: () => void
  onSaveRoom: (room: string) => void
  onDelete: () => void
  onMakeCover: () => void
  onReupload: () => void
}

function PhotoTile({
  photo,
  isCover,
  editing,
  onEdit,
  onSaveRoom,
  onDelete,
  onMakeCover,
  onReupload,
}: PhotoTileProps) {
  const [draft, setDraft] = useState(photo.room)

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-xl bg-cover bg-center text-left"
      style={{ backgroundImage: `url(${photo.url})` }}
    >
      {isCover && (
        <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[12px] font-medium text-white">
          Cover Photo
        </span>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white/90 text-[#31353F] outline-none">
          <MoreHorizontal className="size-4" strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={onMakeCover} className="text-[12px] text-[#20232D]">
            Change to Cover
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onReupload} className="text-[12px] text-[#20232D]">
            Re-upload
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onDelete} className="text-[12px] text-[#DF1C41] focus:text-[#DF1C41]">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="absolute bottom-3 left-3">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSaveRoom(draft)
            }}
            onBlur={() => onSaveRoom(draft)}
            className="rounded-md bg-white px-2 py-1 text-[12px] font-medium text-[#0A0D14] outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[12px] font-medium text-[#0A0D14]"
          >
            {photo.room}
            <Pencil className="size-3 text-[#2B59FF]" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  )
}
