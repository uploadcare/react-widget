import { useRef, useEffect } from 'react'

export const useCommitedRef = value => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
