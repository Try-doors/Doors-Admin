import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Filter, Plus } from 'lucide-react'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { OwnersEmptyState } from '#/components/owners/owners-empty-state'
import { OwnersPagination } from '#/components/owners/owners-pagination'
import { OwnersTable } from '#/components/owners/owners-table'
import { useOwners } from '#/lib/owners-store'

export const Route = createFileRoute('/owners')({ component: OwnersPage })

function OwnersPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'active' | 'pending'>('active')
  const { activeOwners, pendingOwners, deleteActiveOwner, deletePendingOwner, approveOwner } =
    useOwners()

  const owners = tab === 'active' ? activeOwners : pendingOwners

  function goToNewOwner() {
    navigate({ to: '/owners/new' })
  }

  function goToOwner(id: string) {
    navigate({ to: '/owners/$ownerId', params: { ownerId: id } })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">
            Property Owners
          </h1>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-0.5 rounded-full border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              <Filter className="size-5" strokeWidth={1.75} />
              Filter By
            </button>
            <button
              type="button"
              onClick={goToNewOwner}
              className="flex items-center gap-0.5 rounded-full bg-[#2B59FF] px-3 py-1.5 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
            >
              <Plus className="size-5" strokeWidth={1.75} />
              New Owner
            </button>
          </div>
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
            onClick={() => setTab('pending')}
            className={
              'flex flex-col items-center gap-2 px-1 pt-1 text-[14px] tracking-[-0.084px] ' +
              (tab === 'pending' ? 'font-medium text-[#2B59FF]' : 'font-normal text-[#161922]')
            }
          >
            <span className="flex items-center gap-1.5">
              Pending Approval
              <span className="flex size-4 items-center justify-center rounded-full bg-[#C2D6FF] text-[8px] font-semibold uppercase tracking-[-0.16px] text-[#162664]">
                {String(pendingOwners.length).padStart(2, '0')}
              </span>
            </span>
            <span className={'h-0.5 w-full ' + (tab === 'pending' ? 'bg-[#2B59FF]' : 'bg-transparent')} />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white">
          {owners.length === 0 ? (
            <OwnersEmptyState onNewOwner={goToNewOwner} />
          ) : (
            <OwnersTable
              owners={owners}
              variant={tab}
              hidePhone={tab === 'pending'}
              onDelete={tab === 'active' ? deleteActiveOwner : deletePendingOwner}
              onApprove={tab === 'pending' ? approveOwner : undefined}
              onView={goToOwner}
            />
          )}
        </div>

        {owners.length > 0 && <OwnersPagination total={250} />}
      </div>
    </DashboardLayout>
  )
}
