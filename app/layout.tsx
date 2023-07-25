import '../styles/globals.css'
import { Orbitron } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const orbitron = Orbitron({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const metadata = {
  title: 'Icarus Drones',
  description: 'DRONES FOR EVERYONE',
}

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }:LayoutProps) {
  return (
    <html lang="en" className={orbitron.className}>
      <body>
        <div className={"layout-screen"}>
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
