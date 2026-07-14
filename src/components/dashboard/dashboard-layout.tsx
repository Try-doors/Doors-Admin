import { useState, type ReactNode } from 'react'

import { Header } from '#/components/dashboard/header'
import { Sidebar } from '#/components/dashboard/sidebar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="md:pl-[240px]">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <main className="overflow-x-hidden px-4 py-6 sm:px-6 md:px-10">{children}</main>
      </div>
    </div>
  )
}
