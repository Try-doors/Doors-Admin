function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

export function OwnerAvatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {initials(name)}
    </div>
  )
}
