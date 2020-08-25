import React, { forwardRef } from 'react'
import { lazy, Suspense } from '@uploadcare/client-suspense'
import { useIsomorphicEffect } from './hooks'

const Uploader = lazy(() =>
  import(/* webpackChunkName: "ucare-widget-chunk" */ './uploader')
)

const Dialog = lazy(() =>
  import(/* webpackChunkName: "ucare-panel-chunk" */ './dialog')
)

const Config = () => {
  useIsomorphicEffect(() => {
    window.UPLOADCARE_INTEGRATION = 'react-widget'
    window.UPLOADCARE_LIVE = false
    window.UPLOADCARE_MANUAL_START = true
  }, [])

  return null
}

export const Widget = forwardRef(
  ({ preloader = 'Loading...', ...props }, ref) => (
    <>
      <Config />

      <Suspense fallback={preloader}>
        <Uploader {...props} apiRef={ref} />
      </Suspense>
    </>
  )
)

export const Panel = ({ preloader = 'Loading...', ...props }) => (
  <>
    <Config />

    <Suspense fallback={preloader}>
      <Dialog {...props} />
    </Suspense>
  </>
)
