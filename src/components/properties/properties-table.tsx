import { useState } from 'react'
import { Bath, BedDouble, Car } from 'lucide-react'

import { PropertyRowMenu } from '#/components/properties/property-row-menu'
import type { Property } from '#/lib/properties-store'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
}

function ApplicationsBadge({ count }: { count: number }) {
  const [hover, setHover] = useState(false)
  return (
    <span
      className="relative flex size-4 items-center justify-center rounded-full bg-[#C2D6FF] text-[9px] font-semibold text-[#162664]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {count}
      {hover && (
        <span className="absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#20232D] px-2.5 py-1 text-[12px] font-normal normal-case text-white shadow-[0px_12px_24px_0px_rgba(134,140,152,0.12)]">
          {count} Applications
        </span>
      )}
    </span>
  )
}

type PropertiesTableProps = {
  properties: Property[]
  onView: (id: string) => void
  onDelete: (id: string) => void
}

export function PropertiesTable({ properties, onView, onDelete }: PropertiesTableProps) {
  return (
    <table className="w-full min-w-[900px] border-collapse text-left">
      <thead>
        <tr className="border-b border-[#F6F8FA]">
          <th className="w-[64px] py-3 pl-5">
            <input type="checkbox" className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]" />
          </th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Name</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Owner</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Property Type</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Location</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Specs</th>
          <th className="w-[80px] py-3 pr-8 text-right text-[14px] font-medium text-[#0C111D]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property, index) => (
          <tr key={property.id} className={index < properties.length - 1 ? 'border-b border-[#F6F8FA]' : ''}>
            <td className="py-4 pl-5">
              <input type="checkbox" className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]" />
            </td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-1.5">
                <p className="text-[14px] text-[#31353F]">{property.name}</p>
                {property.applications && <ApplicationsBadge count={property.applications} />}
              </div>
            </td>
            <td className="py-4 pr-4">
              {property.ownerName ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-white"
                    style={{ backgroundColor: property.ownerAvatarColor ?? '#94A3B8' }}
                  >
                    {initials(property.ownerName)}
                  </div>
                  <p className="text-[14px] text-[#31353F]">{property.ownerName}</p>
                </div>
              ) : (
                <p className="text-[14px] text-[#868C98]">—</p>
              )}
            </td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{property.type}</td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-1.5 text-[14px] text-[#31353F]">
                <span className="text-[16px] leading-none">{property.flag}</span>
                {property.country}
              </div>
            </td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-3 text-[12px] text-[#525866]">
                <span className="flex items-center gap-1">
                  <Car className="size-4" strokeWidth={1.75} />
                  {property.garages}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-4" strokeWidth={1.75} />
                  {property.baths}
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble className="size-4" strokeWidth={1.75} />
                  {property.beds}
                </span>
              </div>
            </td>
            <td className="py-4 pr-6 text-right">
              <div className="flex justify-end">
                <PropertyRowMenu onView={() => onView(property.id)} onDelete={() => onDelete(property.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
