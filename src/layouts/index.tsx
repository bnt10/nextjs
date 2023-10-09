import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative flex h-screen flex-col items-center bg-app-bg px-24pxr pb-40pxr foldable:w-375pxr">
        {children}
      </div>
    </div>
  )
}

export default Layout
