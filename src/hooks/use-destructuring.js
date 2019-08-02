import { useMemo } from 'react'

export const useDestructuring = (fn, object) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => fn(object), [object])
