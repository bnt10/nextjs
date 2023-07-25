import { useContext } from 'react'

import { NestedModalContext } from '@/contexts/NestedModalContext'

const useNestedModal = () => {
  const context = useContext(NestedModalContext)

  if (!context)
    throw new Error(
      'NestedModalContext context must be use inside NestedModalProvider'
    )

  return context
}

export default useNestedModal
