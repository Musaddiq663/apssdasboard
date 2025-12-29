'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [assistantOpen, setAssistantOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)

  // Exact match for route to auto-open relevant section
  useEffect(() => {
    if (pathname === '/dashboard/assistant') {
      setAssistantOpen(true)
      setLearningOpen(false)
    } else if (pathname === '/dashboard/learning') {
      setLearningOpen(true)
      setAssistantOpen(false)
    } else {
      // Home or other pages
      setAssistantOpen(false)
      setLearningOpen(false)
    }
  }, [pathname])

  return (
    <aside
      className="w-64 min-h-screen p-6 flex flex-col"
      style={{
        background: 'var(--card)',
        color: 'var(--text)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
        Admin Panel
      </h1>

      {/* Home */}
      <Link
        href="/dashboard"
        className={`mb-6 px-3 py-3 rounded-xl block transition
          ${pathname === '/dashboard' ? 'font-semibold' : 'opacity-80 hover:opacity-100'}`}
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        🏠 Home
      </Link>

      {/* Assistant App */}
      <button
        onClick={() => setAssistantOpen(prev => !prev)}
        className="w-full flex justify-between items-center px-3 py-3 rounded-xl transition hover:scale-[1.02]"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <span>Assistant App</span>
        <span>{assistantOpen ? '−' : '+'}</span>
      </button>

      {assistantOpen && (
        <div className="ml-4 mt-3 space-y-2 text-sm">
          <Link
            href="/dashboard/assistant"
            className={`block transition
              ${pathname === '/dashboard/assistant' ? 'font-semibold opacity-100' : 'opacity-70 hover:opacity-100'}`}
          >
            • Manage Users
          </Link>
        </div>
      )}

      {/* Learning App */}
      <button
        onClick={() => setLearningOpen(prev => !prev)}
        className="w-full mt-5 flex justify-between items-center px-3 py-3 rounded-xl transition hover:scale-[1.02]"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <span>Learning App</span>
        <span>{learningOpen ? '−' : '+'}</span>
      </button>

      {learningOpen && (
        <div className="ml-4 mt-3 space-y-2 text-sm">
          <Link
            href="/dashboard/learning"
            className={`block transition
              ${pathname === '/dashboard/learning' ? 'font-semibold opacity-100' : 'opacity-70 hover:opacity-100'}`}
          >
            • Manage Users
          </Link>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={() => router.push('/')}
        className="w-full py-3 rounded-xl font-medium transition hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#fff',
        }}
      >
        Logout
      </button>
    </aside>
  )
}
