import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react'
import uploadcare from 'uploadcare-widget'

import { defaultPreviewUrlCallback } from './default-preview-url-callback'
import {
  useCommitedCallback,
  useCustomTabs,
  useDeepEffect,
  useDeepMemo,
  useValidators
} from './hooks'

const useWidget = (
  {
    id,
    name,
    value, // @deprecated
    defaultValue,
    onFileSelect,
    onChange,
    onDialogOpen,
    onDialogClose,
    onTabChange,
    apiRef,
    customTabs,
    validators,
    tabsCss,
    locale,
    localeTranslations,
    localePluralize,
    previewUrlCallback,
    metadataCallback,
    ...options
  },
  uploadcare
) => {
  const input = useRef(null)
  const widget = useRef(null)
  const cachedValueRef = useRef(null)

  const fileSelectedCallback = useCommitedCallback(onFileSelect)
  const changeCallback = useCommitedCallback(onChange)
  const dialogOpenCallback = useCommitedCallback(onDialogOpen)
  const dialogCloseCallback = useCommitedCallback(onDialogClose)
  const tabChangeCallback = useCommitedCallback(onTabChange)

  const metadataCommitedCallback = useCommitedCallback(metadataCallback)
  const previewUrlCommitedCallback = useCommitedCallback(
    previewUrlCallback || defaultPreviewUrlCallback
  )

  const widgetOptions = useDeepMemo(() => options, [options])

  useCustomTabs(customTabs, uploadcare)

  useDeepEffect(() => {
    if (locale) window.UPLOADCARE_LOCALE = locale
    if (localePluralize) window.UPLOADCARE_LOCALE_PLURALIZE = localePluralize
    if (localeTranslations) {
      window.UPLOADCARE_LOCALE_TRANSLATIONS = localeTranslations
    }

    uploadcare.plugin((internal) => {
      internal.locale.rebuild({
        locale: locale || null,
        localeTranslations: localeTranslations || null,
        localePluralize: localePluralize || null
      })
    })

    return () => {
      if (locale) delete window.UPLOADCARE_LOCALE
      if (localePluralize) delete window.UPLOADCARE_LOCALE_PLURALIZE
      if (localeTranslations) delete window.UPLOADCARE_LOCALE_TRANSLATIONS
    }
  }, [locale, localeTranslations, localePluralize])

  useEffect(() => {
    const inputEl = input.current
    widget.current = uploadcare.Widget(inputEl, {
      ...widgetOptions,
      metadataCallback: widgetOptions.metadata
        ? undefined
        : metadataCommitedCallback,
      previewUrlCallback: previewUrlCommitedCallback
    })

    const widgetElement = inputEl.nextSibling
    if (cachedValueRef.current) {
      // restore widget value when called twice in React.StrictMode
      widget.current.value(cachedValueRef.current)
    }

    return () => {
      // useEffect could be called twice inside React.StrictMode
      // to reinitialize widget on the same input element, we need to cleanup bounded jquery data on it
      // `uploadcareWidget` is a data attr that is used to store widget api
      // see https://github.com/uploadcare/uploadcare-widget/blob/feat/unsplash-tab/src/widget/live.js#L11
      uploadcare.jQuery(inputEl).removeData('uploadcareWidget')
      widgetElement && widgetElement.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    uploadcare,
    widgetOptions,
    metadataCommitedCallback,
    previewUrlCommitedCallback
  ])

  useValidators(widget, validators)

  useEffect(() => {
    widget.current.onUploadComplete.add(changeCallback)
    widget.current.onChange.add(fileSelectedCallback)

    return () => {
      widget.current.onUploadComplete.remove(changeCallback)
      widget.current.onChange.remove(fileSelectedCallback)
    }
  }, [changeCallback, fileSelectedCallback, uploadcare, widgetOptions])

  useEffect(() => {
    let dialog
    const saveDialog = (ref) => {
      dialog = ref
      dialog
        .done(dialogCloseCallback)
        .fail(dialogCloseCallback)
        .progress(tabChangeCallback)

      dialogOpenCallback(ref)
    }

    widget.current.onDialogOpen.add(saveDialog)

    return () => {
      widget.current.onDialogOpen.remove(saveDialog)
      dialog && dialog.reject()
    }
  }, [
    dialogCloseCallback,
    dialogOpenCallback,
    tabChangeCallback,
    widgetOptions
  ])

  useEffect(() => {
    let files = []
    const saveFiles = (file) => {
      if (file) {
        files = file.files ? file.files() : [file]
      } else {
        files = []
      }
    }

    widget.current.onChange.add(saveFiles)

    return () => {
      files.forEach((file) => file.cancel())
      widget.current.onChange.remove(saveFiles)
    }
  }, [widgetOptions])

  useEffect(() => {
    if (cachedValueRef.current !== defaultValue) {
      widget.current.value(defaultValue)
    }
    cachedValueRef.current = defaultValue
  }, [])

  useEffect(() => {
    if (uploadcare && tabsCss && typeof tabsCss === 'string') {
      if (tabsCss.indexOf('https://') === 0) {
        uploadcare.tabsCss.addUrl(tabsCss)
      } else {
        uploadcare.tabsCss.addStyle(tabsCss)
      }
    }
  }, [uploadcare, tabsCss])

  useImperativeHandle(
    apiRef,
    () => ({
      openDialog: () => widget.current.openDialog(),
      reloadInfo: () => widget.current.reloadInfo(),
      getInput: () => widget.current.inputElement,
      value: (value) => widget.current.value(value)
    }),
    []
  )

  return useCallback(
    () => <input type="hidden" ref={input} id={id} name={name} />,
    [id, name]
  )
}

const Uploader = (props) => {
  const Input = useWidget(props, uploadcare)

  return <Input />
}

export default Uploader
