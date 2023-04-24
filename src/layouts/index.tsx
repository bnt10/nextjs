import Image from 'next/image'
import type { ReactNode } from 'react'

import logoBg from '@/public/assets/images/app-login-bg.png'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="relative h-full w-393pxr bg-slate-100 text-white">
        <Image
          src={logoBg}
          alt="login-bg"
          className="absolute h-full w-full object-cover"
        />
        <div className="relative mobile:bg-slate-300 foldable:bg-red-500">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
