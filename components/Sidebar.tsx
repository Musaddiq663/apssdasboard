'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null)
  const router = useRouter()

  return (
    <aside
      className="w-64 min-h-screen p-6 flex flex-col transition-all duration-500"
      style={{
        background: 'var(--card)',
        color: 'var(--text)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      }}
    >
      {/* Logo */}
      <h1
        className="text-2xl font-bold mb-10 tracking-wide"
        style={{ color: 'var(--primary)' }}
      >
        Admin Panel
      </h1>

      {/* Assistant App */}
      <button
        onClick={() => setOpen(open === 'assistant' ? null : 'assistant')}
        className="w-full flex justify-between items-center py-3 px-3 rounded-xl
        hover:scale-[1.02] transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <span>Assistant App</span>
        <span>{open === 'assistant' ? '−' : '+'}</span>
      </button>

      <AnimatePresence>
        {open === 'assistant' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-4 mt-3 space-y-2 text-sm"
          >
            <Link
              href="/dashboard/assistant"
              className="block opacity-80 hover:opacity-100 transition"
            >
              • Manage Users
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learning App */}
      <button
        onClick={() => setOpen(open === 'learning' ? null : 'learning')}
        className="w-full mt-5 flex justify-between items-center py-3 px-3 rounded-xl
        hover:scale-[1.02] transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <span>Learning App</span>
        <span>{open === 'learning' ? '−' : '+'}</span>
      </button>

      <AnimatePresence>
        {open === 'learning' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-4 mt-3 space-y-2 text-sm"
          >
            <Link
              href="/dashboard/learning"
              className="block opacity-80 hover:opacity-100 transition"
            >
              • Manage Users
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logout */}
      <button
        onClick={() => router.push('/')}
        className="w-full py-3 rounded-xl font-medium
        transition-all duration-300 hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#fff',
          boxShadow: '0 10px 30px rgba(239,68,68,0.4)',
        }}
      >
        Logout
      </button>
    </aside>
  )
}
