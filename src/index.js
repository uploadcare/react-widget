import React, { useLayoutEffect } from 'react'
import { lazy, ClientSuspense } from '@uploadcare/client-suspense'

const Uploader = lazy(() => import('./uploader'))

const Config = () => {
  useLayoutEffect(() => {
    window.UPLOADCARE_LIVE = false
    window.UPLOADCARE_MANUAL_START = true
  }, [])

  return null
}

export const Widget = props => (
  <>
    <Config />

    <ClientSuspense fallback='loading...'>
      <Uploader {...props} />
    </ClientSuspense>
  </>
)
