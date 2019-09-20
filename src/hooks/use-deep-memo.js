import { useRef } from 'react'
import isEqual from 'react-fast-compare'

export function useDeepMemo (
  factory,
  deps
) {
  let isValid = true

  const valueRef = useRef()
  // initial hook call
  if (!valueRef.current) {
    valueRef.current = {
      deps,
      result: factory()
    }
    // subsequent calls
  } else {
    isValid = !!(
      deps &&
      valueRef.current.deps &&
      isEqual(deps, valueRef.current.deps)
    )
  }

  const cache = isValid ? valueRef.current : { deps, result: factory() }
  // must update immediately so any sync renders here don't cause an infinite loop
  valueRef.current = cache

  return cache.result
}
