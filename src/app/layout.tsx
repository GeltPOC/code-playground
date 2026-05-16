import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Code Playground',
  description: 'Editor y ejecutor de código online'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
