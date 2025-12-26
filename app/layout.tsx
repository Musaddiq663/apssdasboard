import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import AnimatedBg from '@/components/AnimatedBg'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AnimatedBg />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
