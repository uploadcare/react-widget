import { useCallback } from 'react'
import { useCommitedRef } from './use-commited-ref'

export const useCommitedCallback = (callback) => {
  const ref = useCommitedRef(callback)

  return useCallback((...args) => ref.current && ref.current(...args), [ref])
}
