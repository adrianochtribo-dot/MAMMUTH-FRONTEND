import type { Metadata } from 'next'
import './globals.css'
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: 'MAMMUTH•EVENTS™ — Where Communities Come Alive',
  description: 'Scopri eventi culturali autentici nei borghi italiani. Sermoneta e il territorio della Provincia di Latina.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className="bg-mammuth-black text-mammuth-cream min-h-screen">
        {children}
      </body>
    </html>
  )
}
