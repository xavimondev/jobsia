import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { AUTH_REDIRECT } from '../utils/constants'

const inter = Inter({ subsets: ['latin'] })

const description = `Plataforma con búsqueda avanzada de trabajo. Tendrás la opción de generar una entrevista interactiva con un asistente de inteligencia artificial por oferta de trabajo`
const title = 'Jobs.ia - Plataforma para encontrar trabajo gracias a la inteligencia artificial'

export const metadata: Metadata = {
  metadataBase: new URL(AUTH_REDIRECT),
  title,
  description,
  openGraph: {
    title,
    description:
      'Plataforma con búsqueda avanzada de trabajo y generador de entrevistas con inteligencia artificial',
    url: 'https://jobsia.vercel.app/',
    siteName: 'Jobs.ia',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/img/banner.jpg',
        width: 1578,
        height: 849,
        type: 'image/jpeg'
      }
    ]
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <>
          {children}
          <Analytics />
        </>
      </body>
    </html>
  )
}
