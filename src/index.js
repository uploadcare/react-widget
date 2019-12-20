import React, { forwardRef } from 'react'
import { lazy, Suspense } from '@uploadcare/client-suspense'
import { useIsomorphicEffect } from './hooks'

const Uploader = lazy(() =>
  import(/* webpackChunkName: "ucare-widget-chunk" */ './uploader')
)

const Dialog = lazy(() =>
  import(/* webpackChunkName: "ucare-panel-chunk" */ './dialog')
)

const Config = ({ locale, localeTranslations, localePluralize }) => {
  useIsomorphicEffect(() => {
    window.UPLOADCARE_INTEGRATION = 'react-widget'
    window.UPLOADCARE_LIVE = false
    window.UPLOADCARE_MANUAL_START = true
  }, [])

  // configurate translations
  useIsomorphicEffect(() => {
    window.UPLOADCARE_LOCALE = window.UPLOADCARE_LOCALE || locale
    window.UPLOADCARE_LOCALE_TRANSLATIONS =
      window.UPLOADCARE_LOCALE_TRANSLATIONS || localeTranslations
    window.UPLOADCARE_LOCALE_PLURALIZE =
      window.UPLOADCARE_LOCALE_PLURALIZE || localePluralize
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export const Widget = forwardRef(
  (
    {
      locale,
      localeTranslations,
      localePluralize,
      preloader = 'Loading...',
      ...props
    },
    ref
  ) => (
    <>
      <Config
        locale={locale}
        localeTranslations={localeTranslations}
        localePluralize={localeTranslations}
      />

      <Suspense fallback={preloader}>
        <Uploader {...props} apiRef={ref} />
      </Suspense>
    </>
  )
)

export const Panel = ({
  locale,
  localeTranslations,
  localePluralize,
  preloader = 'Loading...',
  ...props
}) => (
  <>
    <Config
      locale={locale}
      localeTranslations={localeTranslations}
      localePluralize={localeTranslations}
    />

    <Suspense fallback={preloader}>
      <Dialog {...props} />
    </Suspense>
  </>
)
