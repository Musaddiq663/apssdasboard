'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Users, BookOpen, ChevronDown, ChevronUp, LogOut } from 'lucide-react'

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
        className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 transition
          ${
            pathname === '/dashboard'
              ? 'bg-white/15 font-semibold'
              : 'hover:bg-white/10'
          }`}
      >
        <Home size={18} /> Home
      </Link>

      {/* Assistant */}
      <button
        onClick={() => setAssistantOpen(v => !v)}
        className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/10"
      >
        <div className="flex items-center gap-2">
          <Users size={18} /> Assistant App
        </div>
        {assistantOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {assistantOpen && (
        <Link
          href="/dashboard/assistant"
          className={`ml-4 mt-2 text-sm flex items-center gap-1 transition
            ${
              pathname === '/dashboard/assistant'
                ? 'opacity-100 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
        >
          <Users size={14} /> Manage Users
        </Link>
      )}

      {/* Learning */}
      <button
        onClick={() => setLearningOpen(v => !v)}
        className="w-full mt-4 flex justify-between items-center px-4 py-3 rounded-xl hover:bg-white/10"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={18} /> Learning App
        </div>
        {learningOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {learningOpen && (
        <Link
          href="/dashboard/learning"
          className={`ml-4 mt-2 text-sm flex items-center gap-1 transition
            ${
              pathname === '/dashboard/learning'
                ? 'opacity-100 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
        >
          <BookOpen size={14} /> Manage Users
        </Link>
      )}

      {/* Push logout to bottom */}
      <div className="mt-auto pt-6">
        <button
          onClick={() => router.push('/')}
          className="
            w-full 
            py-3 
            rounded-xl 
            font-semibold 
            text-white
            bg-gradient-to-r 
            from-cyan-500 
            to-indigo-500
            shadow-lg
            transition-all
            hover:opacity-90 
            hover:scale-[1.02]
            flex items-center justify-center gap-2
          "
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )
}
