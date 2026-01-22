import type { Metadata } from 'next'
import { Crimson_Text, Playfair_Display } from 'next/font/google'
import './globals.css'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
})

const playfairDisplay = Playfair_Display({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Cofre Secreto',
  description: 'Uma experiência narrativa interativa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${crimsonText.variable} ${playfairDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

