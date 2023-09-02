import Footer from '@/component/navigation/Footer'
import CalendarPageHeader from '@/component/todo/calendarPage/Header'

import type { LayoutProps } from './type'

export default function CalendarPageLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg ">
      <CalendarPageHeader />
      {children}
      <Footer />
    </div>
  )
}
