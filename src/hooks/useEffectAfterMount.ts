import type { DependencyList, EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

function useEffectAfterMount(cb: EffectCallback, dependencies: DependencyList) {
  const justMounted = useRef(true)
  const dependenciesRef = useRef(dependencies)
  console.log(
    justMounted.current,
    'zz',
    dependenciesRef.current === dependencies,
    dependenciesRef.current,
    dependencies
  )
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

export default useEffectAfterMount
