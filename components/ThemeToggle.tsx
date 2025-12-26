'use client'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-2">
      {['light','dark','ocean','purple'].map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded-lg text-sm capitalize border 
          ${theme === t ? 'bg-[var(--primary)] text-white' : ''}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
