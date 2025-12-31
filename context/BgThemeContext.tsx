'use client'
import { createContext, useContext, useState } from 'react'

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
}

const BgThemeContext = createContext<BgContextType | null>(null)

export function BgThemeProvider({ children }: { children: React.ReactNode }) {
  const [bg, setBg] = useState(bgImages[0])

  return (
    <BgThemeContext.Provider value={{ bg, setBg, bgImages }}>
      {children}
    </BgThemeContext.Provider>
  )
}

export const useBgTheme = () => {
  const ctx = useContext(BgThemeContext)
  if (!ctx) throw new Error('useBgTheme must be inside BgThemeProvider')
  return ctx
}
