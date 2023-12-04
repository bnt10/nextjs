import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ScrollLayout({ children }: Props) {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-y-auto scrollbar-hide">
      {children}
    </section>
  )
}
