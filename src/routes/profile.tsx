import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { PersonalInfoTab } from '#/components/profile/personal-info-tab'
import { ProfileTabs, type ProfileTab } from '#/components/profile/profile-tabs'
import { ResetPasswordTab } from '#/components/profile/reset-password-tab'
import { SuccessToast } from '#/components/profile/success-toast'
import { TeamManagementTab } from '#/components/profile/team-management-tab'

type ProfileSearch = { tab?: ProfileTab }

export const Route = createFileRoute('/profile')({
  validateSearch: (search: Record<string, unknown>): ProfileSearch => ({
    tab: search.tab === 'team' || search.tab === 'reset' ? search.tab : 'personal',
  }),
  component: ProfilePage,
})

function ProfilePage() {
  const { tab = 'personal' } = Route.useSearch()
  const navigate = useNavigate()
  const [toast, setToast] = useState<string | null>(null)

  function setTab(nextTab: ProfileTab) {
    navigate({ to: '/profile', search: { tab: nextTab } })
  }

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        {toast && (
          <div className="fixed left-1/2 top-6 z-40 -translate-x-1/2">
            <SuccessToast message={toast} onDismiss={() => setToast(null)} />
          </div>
        )}

        <h1 className="text-[24px] font-semibold tracking-[-1px] text-[#0C111D]">My Profile</h1>

        <ProfileTabs tab={tab} onChange={setTab} />

        {tab === 'personal' && <PersonalInfoTab onSaved={() => showToast('Profile updated')} />}
        {tab === 'team' && <TeamManagementTab onSaved={showToast} />}
        {tab === 'reset' && <ResetPasswordTab onSaved={() => showToast('Password updated')} />}
      </div>
    </DashboardLayout>
  )
}
