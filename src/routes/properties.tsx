import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Filter, Plus } from 'lucide-react'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { OwnersPagination } from '#/components/owners/owners-pagination'
import { DeletePropertyModal } from '#/components/properties/delete-property-modal'
import { FilterChipsBar } from '#/components/properties/filter-chips-bar'
import { emptyPropertyFilters, PropertyFilterPanel, type PropertyFilters } from '#/components/properties/property-filter-panel'
import { PropertiesEmptyState } from '#/components/properties/properties-empty-state'
import { PropertiesTable } from '#/components/properties/properties-table'
import { SuccessToast } from '#/components/profile/success-toast'
import { useProperties, type Property } from '#/lib/properties-store'

export const Route = createFileRoute('/properties')({ component: PropertiesPage })

function matchesFilters(property: Property, filters: PropertyFilters) {
  if (filters.categories.size > 0 && !filters.categories.has(property.status)) return false
  if (filters.types.size > 0 && !filters.types.has(property.type)) return false
  if (filters.ownerId && property.ownerId !== filters.ownerId) return false
  if (filters.country && property.country !== filters.country) return false
  if (filters.state && !(property.state ?? '').toLowerCase().includes(filters.state.toLowerCase())) return false
  if (filters.city && !(property.city ?? '').toLowerCase().includes(filters.city.toLowerCase())) return false
  if (
    filters.localGovernment &&
    !(property.localGovernment ?? '').toLowerCase().includes(filters.localGovernment.toLowerCase())
  )
    return false
  if (filters.zipcode && !(property.zipcode ?? '').toLowerCase().includes(filters.zipcode.toLowerCase()))
    return false
  return true
}

function PropertiesPage() {
  const navigate = useNavigate()
  const { properties, deleteProperty } = useProperties()

  const [filterPanelOpen, setFilterPanelOpen] = useState(false)
  const [filters, setFilters] = useState<PropertyFilters>(emptyPropertyFilters)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const filtered = properties.filter((property) => matchesFilters(property, filters))

  function goToNewProperty() {
    navigate({ to: '/properties/new' })
  }

  function goToProperty(id: string) {
    navigate({ to: '/properties/$propertyId', params: { propertyId: id } })
  }

  function confirmDelete() {
    if (!deleteTarget) return
    deleteProperty(deleteTarget)
    setDeleteTarget(null)
    setToast('Property Deleted')
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">Properties</h1>
          {toast && <SuccessToast message={toast} onDismiss={() => setToast(null)} />}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setFilterPanelOpen(true)}
              className="flex items-center gap-0.5 rounded-full border border-[#E2E4E9] bg-white px-3 py-1.5 text-[14px] font-medium text-[#525866] shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)]"
            >
              <Filter className="size-5" strokeWidth={1.75} />
              Filter By
            </button>
            <button
              type="button"
              onClick={goToNewProperty}
              className="flex items-center gap-0.5 rounded-full bg-[#2B59FF] px-3 py-1.5 text-[14px] font-medium text-white shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] hover:bg-[#2B59FF]/90"
            >
              <Plus className="size-5" strokeWidth={1.75} />
              New Property
            </button>
          </div>
        </div>

        <FilterChipsBar filters={filters} onChange={setFilters} />

        <div className="rounded-2xl bg-white">
          {properties.length === 0 ? (
            <PropertiesEmptyState onNewProperty={goToNewProperty} />
          ) : (
            <PropertiesTable properties={filtered} onView={goToProperty} onDelete={setDeleteTarget} />
          )}
        </div>

        {properties.length > 0 && <OwnersPagination total={250} />}
      </div>

      <PropertyFilterPanel
        open={filterPanelOpen}
        initial={filters}
        onClose={() => setFilterPanelOpen(false)}
        onApply={(next) => {
          setFilters(next)
          setFilterPanelOpen(false)
        }}
      />

      {deleteTarget && (
        <DeletePropertyModal onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      )}
    </DashboardLayout>
  )
}
