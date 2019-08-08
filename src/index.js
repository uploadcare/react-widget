import React, { useLayoutEffect } from 'react'
import { lazy, Suspense } from '@uploadcare/client-suspense'

const Uploader = lazy(() => import('./uploader'))
const Dialog = lazy(() => import('./dialog'))

const Config = ({ locale, localeTranslations, localePluralize }) => {
  useLayoutEffect(() => {
    window.UPLOADCARE_LIVE = false
    window.UPLOADCARE_MANUAL_START = true
  }, [])

  // configurate translations
  useLayoutEffect(() => {
    window.UPLOADCARE_LOCALE = window.UPLOADCARE_LOCALE || locale
    window.UPLOADCARE_LOCALE_TRANSLATIONS =
      window.UPLOADCARE_LOCALE_TRANSLATIONS || localeTranslations
    window.UPLOADCARE_LOCALE_PLURALIZE =
      window.UPLOADCARE_LOCALE_PLURALIZE || localePluralize
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export const Widget = ({
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
      <Uploader {...props} />
    </Suspense>
  </>
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
