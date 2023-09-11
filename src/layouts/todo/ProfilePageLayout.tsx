import Footer from '@/component/navigation/Footer'
import ProfileHeader from '@/component/todo/profile/ProfileHeader'

import type { LayoutProps } from './type'

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg px-24pxr">
      <ProfileHeader />
      {children}
      <Footer />
    </div>
  )
}
