import { ChevronDown, ChevronUp } from 'lucide-react'

export function TrendBadge({ direction }: { direction: 'up' | 'down' }) {
  if (direction === 'down') {
    return <ChevronDown className="size-5 text-[#DF1C41]" strokeWidth={2.5} />
  }
  return <ChevronUp className="size-5 text-[#079455]" strokeWidth={2.5} />
}
