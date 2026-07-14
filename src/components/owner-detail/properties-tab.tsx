import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { OwnersPagination } from '#/components/owners/owners-pagination'
import { DeletePropertyModal } from '#/components/properties/delete-property-modal'
import { PropertiesTable } from '#/components/properties/properties-table'
import { useProperties } from '#/lib/properties-store'

export function PropertiesTab() {
  const navigate = useNavigate()
  const { properties, deleteProperty } = useProperties()
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[18px] font-semibold tracking-[-0.176px] text-[#0A0D14]">Properties</h2>

      <div className="rounded-2xl bg-white">
        <PropertiesTable
          properties={properties}
          onView={(id) => navigate({ to: '/properties/$propertyId', params: { propertyId: id } })}
          onDelete={setDeleteTarget}
        />
      </div>

      <OwnersPagination total={250} />

      {deleteTarget && (
        <DeletePropertyModal
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteProperty(deleteTarget)
            setDeleteTarget(null)
          }}
        />
      )}
    </div>
  )
}
