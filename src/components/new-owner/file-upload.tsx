import { useRef, useState } from 'react'
import { CircleX, FileText, UploadCloud } from 'lucide-react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4']
const MAX_SIZE_BYTES = 50 * 1024 * 1024

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

type FileUploadProps = {
  value: File | null
  onChange: (file: File | null) => void
}

export function FileUpload({ value, onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function validateAndSet(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Use JPEG, PNG, PDF, or MP4.')
      return
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('File is too large. Max size is 50 MB.')
      return
    }
    setError(null)
    onChange(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) validateAndSet(file)
  }

  if (value) {
    return (
      <div className="flex w-full items-center gap-3 rounded-xl border border-[#E2E4E9] p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#F5F8FF]">
          <FileText className="size-5 text-[#2B59FF]" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-[#0A0D14]">{value.name}</p>
          <p className="text-[12px] text-[#868C98]">{formatSize(value.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="Remove file"
          className="shrink-0 text-[#868C98] hover:text-[#525866]"
        >
          <CircleX className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={
          'flex w-full flex-col items-center justify-center gap-5 rounded-xl border border-dashed p-8 ' +
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
          accept={ACCEPTED_TYPES.join(',')}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) validateAndSet(file)
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="text-[12px] text-[#DF1C41]">{error}</p>}
    </div>
  )
}
