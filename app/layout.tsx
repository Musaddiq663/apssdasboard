import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { BgThemeProvider } from '@/context/BgThemeContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <BgThemeProvider>
            {children}
          </BgThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
