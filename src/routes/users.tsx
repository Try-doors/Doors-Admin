import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Filter } from 'lucide-react'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { OwnersPagination } from '#/components/owners/owners-pagination'
import { UsersEmptyState } from '#/components/users/users-empty-state'
import { UsersTable } from '#/components/users/users-table'
import { useUsers, type PlatformUser } from '#/lib/users-store'

export const Route = createFileRoute('/users')({ component: UsersPage })

type Tab = 'active' | 'archived' | 'blocked'

function UsersPage() {
  const [tab, setTab] = useState<Tab>('active')
  const {
    activeUsers,
    archivedUsers,
    blockedUsers,
    blockUser,
    unblockUser,
    archiveUser,
    unarchiveUser,
    deleteUser,
  } = useUsers()

  const usersByTab: Record<Tab, PlatformUser[]> = {
    active: activeUsers,
    archived: archivedUsers,
    blocked: blockedUsers,
  }
  const users = usersByTab[tab]

  function getActions(user: PlatformUser) {
    const viewAction = { label: 'View', onSelect: () => {} }
    const deleteAction = { label: 'Delete', onSelect: () => deleteUser(user.id), danger: true }

    if (tab === 'archived') {
      return [
        viewAction,
        { label: 'Unarchive', onSelect: () => unarchiveUser(user.id) },
        { label: 'Block', onSelect: () => blockUser(user.id) },
        deleteAction,
      ]
    }
    if (tab === 'blocked') {
      return [
        viewAction,
        { label: 'Unblock', onSelect: () => unblockUser(user.id) },
        { label: 'Archive', onSelect: () => archiveUser(user.id) },
        deleteAction,
      ]
    }
    return [
      viewAction,
      { label: 'Block', onSelect: () => blockUser(user.id) },
      { label: 'Archive', onSelect: () => archiveUser(user.id) },
      deleteAction,
    ]
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Users</h1>
          {users.length > 0 && (
            <button
              type="button"
              className="flex items-center gap-0.5 rounded-full border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              <Filter className="size-5" strokeWidth={1.75} />
              Filter By
            </button>
          )}
        </div>

        <div className="flex gap-4 border-b border-[#F2F4F7]">
          <button
            type="button"
            onClick={() => setTab('active')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'active' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            Active
            <span className={'h-0.5 w-full ' + (tab === 'active' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
          </button>
          <button
            type="button"
            onClick={() => setTab('archived')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'archived' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            <span className="flex items-center gap-1.5">
              Archived
              <span className="flex size-4 items-center justify-center rounded-full bg-[#C2D6FF] text-[8px] font-semibold uppercase tracking-[-0.16px] text-[#162664]">
                {String(archivedUsers.length).padStart(2, '0')}
              </span>
            </span>
            <span className={'h-0.5 w-full ' + (tab === 'archived' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
          </button>
          <button
            type="button"
            onClick={() => setTab('blocked')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'blocked' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            <span className="flex items-center gap-1.5">
              Blocked
              <span className="flex size-4 items-center justify-center rounded-full bg-[#C2D6FF] text-[8px] font-semibold uppercase tracking-[-0.16px] text-[#162664]">
                {String(blockedUsers.length).padStart(2, '0')}
              </span>
            </span>
            <span className={'h-0.5 w-full ' + (tab === 'blocked' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white">
          {users.length === 0 ? (
            <UsersEmptyState />
          ) : (
            <UsersTable users={users} getActions={getActions} />
          )}
        </div>

        {users.length > 0 && <OwnersPagination total={250} />}
      </div>
    </DashboardLayout>
  )
}
