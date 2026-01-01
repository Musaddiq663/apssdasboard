'use client'

import Sidebar from '@/components/Sidebar'
import { useBgTheme } from '@/context/BgThemeContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { bg, mounted } = useBgTheme()

  // ⛔ STOP rendering until bg is ready
  if (!mounted) return null

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Layout */}
      <div className="relative z-10 flex h-full">
        {/* Sidebar — FIXED */}
        <div className="h-full shrink-0">
          <Sidebar />
        </div>

        {/* Content — SCROLL ONLY HERE */}
        <main className="flex-1 h-full overflow-y-auto p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
