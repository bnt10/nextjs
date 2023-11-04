import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

function useEffectAfterMount(cb: EffectCallback, dependencies: DependencyList) {
  const justMounted = useRef(true)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

export default useEffectAfterMount
