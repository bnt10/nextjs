import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ModalLayout({ children }: Props) {
  return (
    <div className="absolute flex-col items-center justify-center ">
      <div className=" w-327pxr rounded bg-footer-gray px-8pxr pb-8pxr">
        {children}
      </div>
    </div>
  )
}
