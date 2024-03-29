import Footer from '@/component/navigation/Footer'
import CalendarPageHeader from '@/component/todo/calendarPage/Header'

import type { LayoutProps } from './type'

export default function CalendarPageLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-app-bg foldable:w-375pxr">
      <CalendarPageHeader />
      <div className="flex w-full grow flex-col overflow-hidden">
        {children}
      </div>
      <Footer />
    </div>
  )
}
