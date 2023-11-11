import Footer from '@/component/navigation/Footer'
import Header from '@/component/navigation/Header'

import type { LayoutProps } from './type'

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg foldable:w-375pxr">
      <Header />
      <div className="flex grow flex-col overflow-hidden">{children}</div>
      <Footer />
    </div>
  )
}
