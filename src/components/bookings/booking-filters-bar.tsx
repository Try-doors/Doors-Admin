import { ChevronDown, Flag, Search } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { BookingStatus } from '#/lib/bookings-store'

export type BookingFilters = {
  statuses: Set<BookingStatus>
  propertyType: 'all' | 'hotel' | 'shortlet'
  source: 'all' | 'consumer' | 'corporate'
  dateField: 'checkIn' | 'checkOut' | 'createdAt'
  dateFrom: string
  dateTo: string
  agentOrHotel: string
  flaggedOnly: boolean
}

export const emptyBookingFilters: BookingFilters = {
  statuses: new Set(),
  propertyType: 'all',
  source: 'all',
  dateField: 'checkIn',
  dateFrom: '',
  dateTo: '',
  agentOrHotel: '',
  flaggedOnly: false,
}

const allStatuses: BookingStatus[] = [
  'DRAFT',
  'HELD',
  'PENDING_APPROVAL',
  'CONFIRMED',
  'MODIFIED',
  'CHECKED_IN',
  'COMPLETED',
  'CANCELLED',
  'DISPUTED',
  'EXPIRED',
  'FAILED',
]

const segmentedClassName = 'flex rounded-lg bg-[#F6F8FA] p-1'
function segmentButtonClassName(active: boolean) {
  return (
    'rounded-md px-3 py-1.5 text-[13px] font-medium capitalize ' +
    (active ? 'bg-white text-[#0A0D14] shadow-sm' : 'text-[#868C98]')
  )
}

export function BookingFiltersBar({
  filters,
  onChange,
}: {
  filters: BookingFilters
  onChange: (filters: BookingFilters) => void
}) {
  function toggleStatus(status: BookingStatus) {
    const next = new Set(filters.statuses)
    if (next.has(status)) next.delete(status)
    else next.add(status)
    onChange({ ...filters, statuses: next })
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-lg border border-[#E2E4E9] bg-white p-2.5">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-lg border border-[#E2E4E9] bg-white px-3 py-1.5 text-[13px] font-medium text-[#525866] outline-none">
          {filters.statuses.size === 0 ? 'All Statuses' : `Status (${filters.statuses.size})`}
          <ChevronDown className="size-4" strokeWidth={1.75} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-[320px] w-[200px] overflow-y-auto">
          {allStatuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={filters.statuses.has(status)}
              onSelect={(e) => e.preventDefault()}
              onCheckedChange={() => toggleStatus(status)}
              className="text-[12px] text-[#20232D]"
            >
              {status.replace('_', ' ')}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className={segmentedClassName}>
        {(['all', 'hotel', 'shortlet'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange({ ...filters, propertyType: type })}
            className={segmentButtonClassName(filters.propertyType === type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className={segmentedClassName}>
        {(['all', 'consumer', 'corporate'] as const).map((source) => (
          <button
            key={source}
            type="button"
            onClick={() => onChange({ ...filters, source })}
            className={segmentButtonClassName(filters.source === source)}
          >
            {source}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] px-2 py-1">
        <select
          value={filters.dateField}
          onChange={(e) => onChange({ ...filters, dateField: e.target.value as BookingFilters['dateField'] })}
          className="bg-transparent text-[13px] font-medium text-[#525866] outline-none"
        >
          <option value="checkIn">Check-in</option>
          <option value="checkOut">Check-out</option>
          <option value="createdAt">Created</option>
        </select>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
          className="w-[130px] text-[13px] text-[#0A0D14] outline-none"
        />
        <span className="text-[13px] text-[#868C98]">to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
          className="w-[130px] text-[13px] text-[#0A0D14] outline-none"
        />
      </div>

      <div className="flex items-center gap-1.5 rounded-lg border border-[#E2E4E9] px-3 py-1.5">
        <Search className="size-4 text-[#868C98]" strokeWidth={1.75} />
        <input
          value={filters.agentOrHotel}
          onChange={(e) => onChange({ ...filters, agentOrHotel: e.target.value })}
          placeholder="Search agent or hotel..."
          className="w-[160px] text-[13px] text-[#0A0D14] outline-none placeholder:text-[#868C98]"
        />
      </div>

      <button
        type="button"
        onClick={() => onChange({ ...filters, flaggedOnly: !filters.flaggedOnly })}
        className={
          'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium ' +
          (filters.flaggedOnly
            ? 'border-[#DF1C41] bg-[#FEE4E2] text-[#DF1C41]'
            : 'border-[#E2E4E9] bg-white text-[#525866]')
        }
      >
        <Flag className="size-4" strokeWidth={1.75} />
        Flagged only
      </button>

      {(filters.statuses.size > 0 ||
        filters.propertyType !== 'all' ||
        filters.source !== 'all' ||
        filters.dateFrom ||
        filters.dateTo ||
        filters.agentOrHotel ||
        filters.flaggedOnly) && (
        <button
          type="button"
          onClick={() => onChange(emptyBookingFilters)}
          className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#2B59FF]"
        >
          Reset All
        </button>
      )}
    </div>
  )
}
