import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="relative h-full w-393pxr ">{children}</div>
    </div>
  )
}

export default Layout
