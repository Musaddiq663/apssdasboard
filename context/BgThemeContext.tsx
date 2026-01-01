'use client'

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'

const bgImages = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpg',
  '/images/bg4.jpg',
  '/images/bg5.jpg',
  '/images/bg6.jpg',
  '/images/bg7.jpg',
  '/images/bg8.jpg',
]

type BgContextType = {
  bg: string
  setBg: (bg: string) => void
  bgImages: string[]
  mounted: boolean
}

const BgThemeContext = createContext<BgContextType | null>(null)

export function BgThemeProvider({ children }: { children: React.ReactNode }) {
  const [bg, setBg] = useState<string>('') // ⚠️ EMPTY INIT
  const [mounted, setMounted] = useState(false)

  // 🔥 runs BEFORE paint
  useLayoutEffect(() => {
    const saved = localStorage.getItem('dashboard-bg')
    if (saved && bgImages.includes(saved)) {
      setBg(saved)
    } else {
      setBg(bgImages[0])
    }
    setMounted(true)
  }, [])

  const changeBg = (newBg: string) => {
    setBg(newBg)
    localStorage.setItem('dashboard-bg', newBg)
  }

  return (
    <BgThemeContext.Provider
      value={{ bg, setBg: changeBg, bgImages, mounted }}
    >
      {children}
    </BgThemeContext.Provider>
  )
}

export const useBgTheme = () => {
  const ctx = useContext(BgThemeContext)
  if (!ctx) throw new Error('useBgTheme must be inside BgThemeProvider')
  return ctx
}
