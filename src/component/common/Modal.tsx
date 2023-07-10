import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import { createPortal } from 'react-dom'

import useModal from '@/hooks/useModal'

// context
interface Props {
  children: ReactNode
}

function Modal({ children }: Props) {
  const { setOpenModal } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setOpenModal(false)
    }
  }
  return createPortal(
    <div
      className={'absolute grid h-screen place-items-center'}
      onClick={(e) => closeModal(e)}
      ref={modalRef}
    >
      {children}
    </div>,
    document.body
  )
}

export default Modal
