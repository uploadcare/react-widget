import React, { useEffect, useImperativeHandle, useRef } from 'react'
import uploadcare from 'uploadcare-widget'
import { useCustomTabs, useDeepEffect, useEventCallback } from './hooks'

const containerStyles = {
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const hiddenDoneButtonStyle = /* css */ `
  .uploadcare--preview__done, .uploadcare--panel__done {
    display: none;
  }
`

const useDialog = (props, uploadcare) => {
  const {
    value = [],
    apiRef,
    customTabs,
    tabsCss,
    locale,
    localeTranslations,
    localePluralize,
    onTabChange,
    onChange,
    onTabVisibility,
    onProgress
  } = props

  const panelContainer = useRef(null)
  const panelInstance = useRef(null)

  const getDialogApi = () => panelInstance.current

  const onTabChangeCallback = useEventCallback(onTabChange)
  const onChangeCallback = useEventCallback(onChange)
  const onTabVisibilityCallback = useEventCallback(onTabVisibility)
  const onProgressCallback = useEventCallback(onProgress)

  useCustomTabs(customTabs, uploadcare)

  useDeepEffect(() => {
    if (locale) window.UPLOADCARE_LOCALE = locale
    if (localePluralize) window.UPLOADCARE_LOCALE_PLURALIZE = localePluralize
    if (localeTranslations) {
      window.UPLOADCARE_LOCALE_TRANSLATIONS = localeTranslations
    }

    return () => {
      if (locale) delete window.UPLOADCARE_LOCALE
      if (localePluralize) delete window.UPLOADCARE_LOCALE_PLURALIZE
      if (localeTranslations) delete window.UPLOADCARE_LOCALE_TRANSLATIONS
    }
  }, [locale, localePluralize, localeTranslations])

  window.api = panelInstance

  useEffect(() => {
    if (uploadcare && tabsCss && typeof tabsCss === 'string') {
      if (tabsCss.indexOf('https://') === 0) {
        uploadcare.tabsCss.addUrl(tabsCss)
      } else {
        uploadcare.tabsCss.addStyle(tabsCss)
      }
    }
  }, [uploadcare, tabsCss])

  useEffect(() => {
    const files = Array.isArray(value) ? value : [value]
    panelInstance.current && panelInstance.current.reject()
    panelInstance.current = uploadcare.openPanel(
      panelContainer.current,
      files,
      {
        multipleMax: props.multiple ? undefined : 1,
        ...props,
        multiple: true,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadcare, props])

  useEffect(() => {
    getDialogApi().progress(onTabChangeCallback)

    const onChangeWrapper = () => {
      const items = getDialogApi().fileColl.__items.map((deferred) =>
        deferred.promise()
      )
      onChangeCallback(items)
    }

    const onProgressWrapper = () => {
      const lastProgresses = getDialogApi().fileColl.lastProgresses()
      onProgressCallback(lastProgresses)
    }

    getDialogApi().fileColl.anyProgressList.add(onProgressWrapper)

    getDialogApi().fileColl.anyDoneList.add(onChangeWrapper)
    getDialogApi().fileColl.anyFailList.add(onChangeWrapper)
    getDialogApi().fileColl.onRemove.add(onChangeWrapper)
    getDialogApi().fileColl.onReplace.add(onChangeWrapper)
    getDialogApi().fileColl.onSort.add(onChangeWrapper)

    return () => {
      getDialogApi().fileColl.anyProgressList.remove(onProgressWrapper)

      getDialogApi().fileColl.anyDoneList.remove(onChangeWrapper)
      getDialogApi().fileColl.anyFailList.remove(onChangeWrapper)
      getDialogApi().fileColl.onRemove.remove(onChangeWrapper)
      getDialogApi().fileColl.onReplace.remove(onChangeWrapper)
      getDialogApi().fileColl.onSort.remove(onChangeWrapper)
    }
  }, [
    onTabChangeCallback,
    onChangeCallback,
    onTabVisibilityCallback,
    onProgressCallback
  ])

  useImperativeHandle(apiRef, () => getDialogApi(), [])

  useEffect(
    () => () => panelInstance.current && panelInstance.current.reject(),
    []
  )

  useEffect(() => {
    let isUpdated = false;
    panelInstance.current.fileColl.clear()

    for (const item of value) {
      if (typeof item === 'string' && item.includes('~')) {
        uploadcare.loadFileGroup(item, props).then((fileGroup) => {
          // value could be changed after group loaded
          if(!isUpdated) {
            const files = fileGroup.files()
            panelInstance.current.addFiles(files)
          }
        })
        break
      }
      panelInstance.current.fileColl.add(
        uploadcare.fileFrom('uploaded', item, props)
      )
    }
    return () => {
      isUpdated = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return [panelContainer]
}

const Dialog = (props) => {
  const [containerRef] = useDialog(props, uploadcare)

  return (
    <div id={props.id} style={containerStyles}>
      <style>{hiddenDoneButtonStyle}</style>
      <div ref={containerRef} />
    </div>
  )
}

export default Dialog
