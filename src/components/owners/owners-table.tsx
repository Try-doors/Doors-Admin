import { useState } from 'react'

import { OwnerAvatar } from '#/components/owners/owner-avatar'
import { RowActionMenu } from '#/components/owners/row-action-menu'
import { UserTypeBadge, type UserType } from '#/components/owners/user-type-badge'

export type Owner = {
  id: string
  name: string
  avatarColor: string
  email: string
  phone: string
  userType: UserType
  date: string
  address?: string
  idNumber?: string
  kycFile?: { name: string; size: string }
}

type OwnersTableProps = {
  owners: Owner[]
  variant: 'active' | 'pending'
  hidePhone?: boolean
  onDelete: (id: string) => void
  onApprove?: (id: string) => void
  onView: (id: string) => void
}

export function OwnersTable({ owners, variant, hidePhone, onDelete, onApprove, onView }: OwnersTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allSelected = owners.length > 0 && selected.size === owners.length

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(owners.map((o) => o.id)))
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <table className="w-full min-w-[860px] border-collapse text-left">
      <thead>
        <tr className="border-b border-[#F6F8FA]">
          <th className="w-[64px] py-3 pl-5">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]"
            />
          </th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Name</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Email Address</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Phone Number</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">User Type</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">
            {variant === 'active' ? 'Date Added' : 'Date Requested'}
          </th>
          <th className="w-[80px] py-3 pr-8 text-right text-[14px] font-medium text-[#0C111D]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {owners.map((owner, index) => (
          <tr
            key={owner.id}
            className={index < owners.length - 1 ? 'border-b border-[#F6F8FA]' : ''}
          >
            <td className="py-4 pl-5">
              <input
                type="checkbox"
                checked={selected.has(owner.id)}
                onChange={() => toggleRow(owner.id)}
                className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]"
              />
            </td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-1.5">
                <OwnerAvatar name={owner.name} color={owner.avatarColor} />
                <p className="max-w-[119px] truncate text-[14px] text-[#31353F]">{owner.name}</p>
              </div>
            </td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{owner.email}</td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">
              {hidePhone ? 'Phone Number' : owner.phone}
            </td>
            <td className="py-4 pr-4">
              <UserTypeBadge type={owner.userType} />
            </td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{owner.date}</td>
            <td className="py-4 pr-6 text-right">
              <div className="flex justify-end">
                <RowActionMenu
                  variant={variant}
                  onView={() => onView(owner.id)}
                  onEdit={() => {}}
                  onApprove={onApprove ? () => onApprove(owner.id) : undefined}
                  onDelete={() => onDelete(owner.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
