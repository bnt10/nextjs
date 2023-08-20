import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRecoilState } from 'recoil'

import { modalContentState } from '@/atoms/modalAtom'

function Modal() {
  const [modalContent, setModalContent] = useRecoilState(modalContentState)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setModalContent(null) // <-- Close the modal by setting the content to null
    }
  }

  if (typeof window === 'undefined' || !modalContent) return null // <-- Don't render if there is no content
  const element = document.getElementById('modal-sub')

  return element
    ? createPortal(
        <div
          className={
            'fixed inset-[0] flex h-screen items-center justify-center bg-black/75'
          }
          onClick={(e) => closeModal(e)}
          ref={modalRef}
        >
          {modalContent}
        </div>,
        element
      )
    : null
}

export default Modal
