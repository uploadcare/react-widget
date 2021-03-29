import { useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

export const useDeepEffect = (effect, deps) => {
  const ref = useRef(undefined)

  if (!isEqual(deps, ref.current)) {
    ref.current = deps
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, ref.current)
}
