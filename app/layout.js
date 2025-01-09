import { Analytics } from '@vercel/analytics/react'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

import UpperLink from '@/components/upperlink'
const PressStart2P = Press_Start_2P({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: {
    template: 'ChemaoWeb | %s',
    default: 'ChemaoWeb',
  },
  description: 'Pagina inicial con una animación con CSS para dar la bienvenida a pagina web',
  category: 'Informática',
  charset: 'UTF-8',
  content: 'width=device-width, initial-scale=1.0',
  authors: [{ name: 'Josep Maria' }],
  creator: 'Josep Maria',
  publisher: 'Josep Maria',
  type: 'website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" >
      <body className={PressStart2P.className + " text-white"}>
        <UpperLink/>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
