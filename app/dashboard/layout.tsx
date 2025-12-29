'use client'

import Sidebar from '@/components/Sidebar'
import AnimatedBg from '@/components/AnimatedBg'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100 dark:bg-[#020617] relative">
        <AnimatedBg />
        {children}
      </main>
    </div>
  )
}
