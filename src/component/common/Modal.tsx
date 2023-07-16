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
  if (typeof window === 'undefined') return <></>
  const element = document.getElementById('modal-root')

  return element
    ? createPortal(
        <div
          className={
            'fixed inset-[0] flex h-screen items-center justify-center'
          }
          onClick={(e) => closeModal(e)}
          ref={modalRef}
        >
          {children}
        </div>,
        element
      )
    : null
}

export default Modal
