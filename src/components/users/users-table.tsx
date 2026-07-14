import { useState } from 'react'

import { OwnerAvatar } from '#/components/owners/owner-avatar'
import { UserRowMenu, type UserRowAction } from '#/components/users/user-row-menu'
import type { PlatformUser } from '#/lib/users-store'

type UsersTableProps = {
  users: PlatformUser[]
  getActions: (user: PlatformUser) => UserRowAction[]
}

export function UsersTable({ users, getActions }: UsersTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const allSelected = users.length > 0 && selected.size === users.length

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(users.map((u) => u.id)))
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
    <table className="w-full border-collapse text-left">
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
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Location</th>
          <th className="py-3 text-[14px] font-medium text-[#0C111D]">Last Login</th>
          <th className="w-[80px] py-3 pr-8 text-right text-[14px] font-medium text-[#0C111D]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} className={index < users.length - 1 ? 'border-b border-[#F6F8FA]' : ''}>
            <td className="py-4 pl-5">
              <input
                type="checkbox"
                checked={selected.has(user.id)}
                onChange={() => toggleRow(user.id)}
                className="size-5 rounded border-[#E2E4E9] accent-[#2B59FF]"
              />
            </td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-1.5">
                <OwnerAvatar name={user.name} color={user.avatarColor} />
                <p className="max-w-[119px] truncate text-[14px] text-[#31353F]">{user.name}</p>
              </div>
            </td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{user.email}</td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{user.phone}</td>
            <td className="py-4 pr-4">
              <div className="flex items-center gap-1.5 text-[14px] text-[#31353F]">
                <span className="text-[16px] leading-none">{user.flag}</span>
                {user.country}
              </div>
            </td>
            <td className="py-4 pr-4 text-[14px] text-[#31353F]">{user.lastLogin}</td>
            <td className="py-4 pr-6 text-right">
              <div className="flex justify-end">
                <UserRowMenu actions={getActions(user)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
