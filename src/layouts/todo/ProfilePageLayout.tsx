import Footer from '@/component/navigation/Footer'
import ProfileHeader from '@/component/todo/profile/ProfileHeader'

import type { LayoutProps } from './type'

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className="relative flex h-screen flex-col items-center bg-app-bg foldable:w-375pxr">
      <div className="w-full overflow-y-auto px-24pxr">
        <ProfileHeader />
        <div className="mb-100pxr w-full ">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
