import { useRef, useState } from 'react'
import { CircleX, UploadCloud, Video as VideoIcon } from 'lucide-react'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export type VideoItem = { id: string; name: string; size: string }

type VideoStepProps = {
  videos: VideoItem[]
  onChange: (videos: VideoItem[]) => void
}

export function VideoStep({ videos, onChange }: VideoStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList).filter((f) => f.type.startsWith('video/'))
    if (files.length === 0) return
    onChange([
      ...videos,
      ...files.map((file) => ({ id: crypto.randomUUID(), name: file.name, size: formatSize(file.size) })),
    ])
  }

  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
        Add Some Videos of your apartment
      </h1>
      <p className="mb-8 text-[14px] tracking-[-0.084px] text-[#525866]">
        You&apos;ll need some videos to get started
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
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {videos.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 text-left">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center gap-3 rounded-xl border border-[#E2E4E9] p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF]">
                <VideoIcon className="size-5 text-[#2B59FF]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium text-[#0A0D14]">{video.name}</p>
                <p className="text-[12px] text-[#868C98]">{video.size}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange(videos.filter((v) => v.id !== video.id))}
                className="shrink-0 text-[#868C98] hover:text-[#525866]"
                aria-label="Remove video"
              >
                <CircleX className="size-5" strokeWidth={1.75} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
