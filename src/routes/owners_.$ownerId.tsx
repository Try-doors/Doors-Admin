import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { OwnerDetailTabs, type OwnerDetailTab } from '#/components/owner-detail/owner-detail-tabs'
import { PersonalInfoTab } from '#/components/owner-detail/personal-info-tab'
import { PropertiesTab } from '#/components/owner-detail/properties-tab'
import { useOwners } from '#/lib/owners-store'

export const Route = createFileRoute('/owners_/$ownerId')({ component: OwnerDetail })

function OwnerDetail() {
  const { ownerId } = Route.useParams()
  const { activeOwners, pendingOwners, updateOwner } = useOwners()
  const [tab, setTab] = useState<OwnerDetailTab>('personal')

  const owner = [...activeOwners, ...pendingOwners].find((o) => o.id === ownerId)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <Link
          to="/owners"
          className="flex w-fit items-center gap-1 text-[14px] font-medium !text-[#2B59FF] no-underline hover:underline"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
          Back
        </Link>

        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Owner Details</h1>

        <OwnerDetailTabs tab={tab} onChange={setTab} />

        {!owner ? (
          <p className="py-12 text-center text-[14px] text-[#525866]">Owner not found.</p>
        ) : tab === 'personal' ? (
          <PersonalInfoTab owner={owner} onSave={(updates) => updateOwner(owner.id, updates)} />
        ) : (
          <PropertiesTab />
        )}
      </div>
    </DashboardLayout>
  )
}
