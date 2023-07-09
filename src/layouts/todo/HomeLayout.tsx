import type { ReactNode } from 'react'

import Footer from '@/component/navigation/Footer'
import Header from '@/component/navigation/Header'

interface LayoutProps {
  children: ReactNode
}
export default function HomeLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg ">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
