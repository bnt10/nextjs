import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="relative box-border flex h-screen flex-col items-center overflow-hidden bg-app-bg px-24pxr foldable:w-375pxr">
        {children}
      </div>
    </div>
  )
}

export default Layout
