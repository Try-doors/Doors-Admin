import { useRef, useState } from 'react'
import { ImagePlus, MoreHorizontal, Pencil, UploadCloud } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

export type PhotoItem = { id: string; url: string; room: string }

type PhotosStepProps = {
  photos: PhotoItem[]
  onChange: (photos: PhotoItem[]) => void
}

const roomSuggestions = ['Sitting Room', 'Kitchen', 'Bedroom', 'Toilet', 'Dining Room']

export function PhotosStep({ photos, onChange }: PhotosStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState<{ total: number; done: number } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draggedId, setDraggedId] = useState<string | null>(null)

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return

    setUploading({ total: files.length, done: 0 })
    let done = 0
    const interval = setInterval(() => {
      done += 1
      setUploading({ total: files.length, done })
      if (done >= files.length) {
        clearInterval(interval)
        const newPhotos: PhotoItem[] = files.map((file, index) => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file),
          room: roomSuggestions[(photos.length + index) % roomSuggestions.length],
        }))
        onChange([...photos, ...newPhotos])
        setUploading(null)
      }
    }, 350)
  }

  function updateRoom(id: string, room: string) {
    onChange(photos.map((p) => (p.id === id ? { ...p, room } : p)))
  }

  function deletePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id))
  }

  function makeCover(id: string) {
    const photo = photos.find((p) => p.id === id)
    if (!photo) return
    onChange([photo, ...photos.filter((p) => p.id !== id)])
  }

  function reorder(targetId: string) {
    if (!draggedId || draggedId === targetId) return
    const fromIndex = photos.findIndex((p) => p.id === draggedId)
    const toIndex = photos.findIndex((p) => p.id === targetId)
    if (fromIndex === -1 || toIndex === -1) return
    const next = [...photos]
    const [moved] = next.splice(fromIndex, 1)
    next.splice(toIndex, 0, moved)
    onChange(next)
  }

  if (uploading) {
    return (
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
          Add Some photos of your apartment
        </h1>
        <p className="mb-8 text-[14px] tracking-[-0.084px] text-[#525866]">
          You&apos;ll need 5 photos to get started. You can add more or make changes later
        </p>
        <div className="flex flex-col items-center gap-3 py-16">
          <div className="size-10 animate-spin rounded-full border-4 border-[#E2E4E9] border-t-[#2970FF]" />
          <p className="text-[14px] font-medium text-[#0A0D14]">
            {uploading.done} of {uploading.total} uploaded
          </p>
          <p className="text-[12px] text-[#868C98]">Processing your photos</p>
        </div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
          Add Some photos of your apartment
        </h1>
        <p className="mb-8 text-[14px] tracking-[-0.084px] text-[#525866]">
          You&apos;ll need 5 photos to get started. You can add more or make changes later
        </p>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          className={
            'flex flex-col items-center justify-center gap-5 rounded-xl border border-dashed p-8 ' +
            (isDragOver ? 'border-[#2B59FF] bg-[#F5F8FF]' : 'border-[#CDD0D5]')
          }
        >
          <UploadCloud className="size-6 text-[#868C98]" strokeWidth={1.75} />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-[14px] font-medium tracking-[-0.084px] text-[#0A0D14]">
              Choose a file or drag &amp; drop it here.
            </p>
            <p className="text-[12px] text-[#868C98]">
              JPEG, PNG, PDF, and MP4 formats, up to 50 MB.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-[#E2E4E9] bg-white px-4 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
          >
            Browse File
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>
      </div>
    )
  }

  const [cover, ...rest] = photos

  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">How does it look</h1>
        <p className="text-[14px] tracking-[-0.084px] text-[#525866]">Drag to re-order</p>
      </div>

      <PhotoTile
        photo={cover}
        isCover
        isDragOver={draggedId !== null && draggedId !== cover.id}
        editing={editingId === cover.id}
        onEdit={() => setEditingId(cover.id)}
        onSaveRoom={(room) => {
          updateRoom(cover.id, room)
          setEditingId(null)
        }}
        onDelete={() => deletePhoto(cover.id)}
        onMakeCover={() => makeCover(cover.id)}
        onReupload={() => inputRef.current?.click()}
        onDragStart={() => setDraggedId(cover.id)}
        onDragEnd={() => setDraggedId(null)}
        onDropOn={() => reorder(cover.id)}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {rest.map((photo) => (
          <PhotoTile
            key={photo.id}
            photo={photo}
            editing={editingId === photo.id}
            onEdit={() => setEditingId(photo.id)}
            onSaveRoom={(room) => {
              updateRoom(photo.id, room)
              setEditingId(null)
            }}
            onDelete={() => deletePhoto(photo.id)}
            onMakeCover={() => makeCover(photo.id)}
            onReupload={() => inputRef.current?.click()}
            onDragStart={() => setDraggedId(photo.id)}
            onDragEnd={() => setDraggedId(null)}
            onDropOn={() => reorder(photo.id)}
          />
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#CDD0D5] text-[#525866] hover:bg-[#F9FAFB]"
        >
          <ImagePlus className="size-6" strokeWidth={1.5} />
          <span className="text-[14px] font-medium">Add More</span>
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </div>
  )
}

type PhotoTileProps = {
  photo: PhotoItem
  isCover?: boolean
  isDragOver?: boolean
  editing: boolean
  onEdit: () => void
  onSaveRoom: (room: string) => void
  onDelete: () => void
  onMakeCover: () => void
  onReupload: () => void
  onDragStart: () => void
  onDragEnd: () => void
  onDropOn: () => void
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
  onDragStart,
  onDragEnd,
  onDropOn,
}: PhotoTileProps) {
  const [draft, setDraft] = useState(photo.room)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropOn}
      className={
        'relative overflow-hidden rounded-xl bg-cover bg-center text-left ' +
        (isCover ? 'aspect-[16/7] w-full' : 'aspect-square w-full')
      }
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
