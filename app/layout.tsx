import Navbar from '@/app/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter,Space_Grotesk } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const spaceGrotest=Space_Grotesk({
  subsets: ['latin'],
  weight:["300","400","500","600","700"]
})

export const metadata: Metadata = {
  title: 'PriceChecker',
  description: 'Track prices and see if you get the best value',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar/>
          {children}
        </main>
        </body>
    </html>
  )
}
