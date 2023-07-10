import { useContext } from 'react'

import { ModalContext } from '@/contexts/ModalContext'

const useModal = () => {
  const context = useContext(ModalContext)

  if (!context) throw new Error('Auth context must be use inside AuthProvider')

  return context
}

export default useModal
