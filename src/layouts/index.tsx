import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="relative h-screen w-screen">{children}</div>
    </div>
  )
}

export default Layout
