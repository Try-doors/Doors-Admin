import type { ReactNode } from 'react'

import { Header } from '#/components/dashboard/header'
import { Sidebar } from '#/components/dashboard/sidebar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar />
      <div className="pl-[240px]">
        <Header />
        <main className="px-10 py-6">{children}</main>
      </div>
    </div>
  )
}
