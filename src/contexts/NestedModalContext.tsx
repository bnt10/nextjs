import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

import type { ContextProps } from './type'

type ModalContextType = {
  OpenNestedModal: boolean
  setOpenNestedModal: Dispatch<SetStateAction<boolean>>
}

export const NestedModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export function NestedModalProvider({ children }: ContextProps) {
  const [OpenNestedModal, setOpenNestedModal] = useState(false)

  return (
    <NestedModalContext.Provider
      value={{
        OpenNestedModal,
        setOpenNestedModal,
      }}
    >
      {children}
    </NestedModalContext.Provider>
  )
}
