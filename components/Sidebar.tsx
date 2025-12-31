'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [assistantOpen, setAssistantOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)

  useEffect(() => {
    if (pathname.startsWith('/dashboard/assistant')) {
      setAssistantOpen(true)
      setLearningOpen(false)
    } else if (pathname.startsWith('/dashboard/learning')) {
      setLearningOpen(true)
      setAssistantOpen(false)
    } else {
      setAssistantOpen(false)
      setLearningOpen(false)
    }
  }, [pathname])

  return (
    <aside
      className="
        w-64 
        h-screen 
        flex 
        flex-col 
        p-6 
        text-white 
        overflow-hidden
      "
      style={{
        background: 'linear-gradient(180deg, #020617, #020617)',
        boxShadow: '0 0 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-8 tracking-wide">
        Admin Panel
      </h1>

      {/* Home */}
      <Link
        href="/dashboard"
        className={`px-4 py-3 rounded-xl mb-4 transition
          ${
            pathname === '/dashboard'
              ? 'bg-white/15 font-semibold'
              : 'hover:bg-white/10'
          }`}
      >
        🏠 Home
      </Link>

      {/* Assistant */}
      <button
        onClick={() => setAssistantOpen(v => !v)}
        className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/10"
      >
        <span>Assistant App</span>
        <span>{assistantOpen ? '−' : '+'}</span>
      </button>

      {assistantOpen && (
        <Link
          href="/dashboard/assistant"
          className={`ml-4 mt-2 text-sm transition
            ${
              pathname === '/dashboard/assistant'
                ? 'opacity-100 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
        >
          • Manage Users
        </Link>
      )}

      {/* Learning */}
      <button
        onClick={() => setLearningOpen(v => !v)}
        className="w-full mt-4 flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/10"
      >
        <span>Learning App</span>
        <span>{learningOpen ? '−' : '+'}</span>
      </button>

      {learningOpen && (
        <Link
          href="/dashboard/learning"
          className={`ml-4 mt-2 text-sm transition
            ${
              pathname === '/dashboard/learning'
                ? 'opacity-100 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
        >
          • Manage Users
        </Link>
      )}

      {/* Push logout to bottom */}
      <div className="mt-auto pt-6">
        <button
          onClick={() => router.push('/')}
          className="w-full py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
