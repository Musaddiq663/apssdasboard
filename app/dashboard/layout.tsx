'use client'

import Sidebar from '@/components/Sidebar'
import { useBgTheme } from '@/context/BgThemeContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { bg } = useBgTheme()

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar — NO SCROLL */}
        <div className="h-full shrink-0">
          <Sidebar />
        </div>

        {/* Main Content — ONLY THIS SCROLLS */}
        <main className="flex-1 h-full overflow-y-auto p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
