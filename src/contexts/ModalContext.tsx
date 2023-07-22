import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

import type { ContextProps } from './type'

type ModalContextType = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export function ModalProvider({ children }: ContextProps) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
