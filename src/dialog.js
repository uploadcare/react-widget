import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useMemo,
  useState
} from 'react'
import uploadcare from 'uploadcare-widget'
import { useCustomTabs, useDeepEffect, useCommitedCallback } from './hooks'
import { defaultPreviewUrlCallback } from './default-preview-url-callback'

const containerStyles = {
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const getHiddenDoneButtonStyle = (containerId) => /* css */ `
  .${containerId} .uploadcare--preview__done:not(.uploadcare-tab-effects--done),
  .${containerId} .uploadcare--panel__done:not(.uploadcare-tab-effects--done) {
    display: none;
  }
`

const getValueItems = (value, props) => {
  let uuids = []
  if (value) {
    uuids = Array.isArray(value) ? value : [value]
  }
  return uuids
}

const useDialog = (props, uploadcare) => {
  const {
    value,
    apiRef,
    onTabChange,
    onChange,
    onProgress,
    customTabs,
    previewUrlCallback,
    metadataCallback,
    ...restProps
  } = props

  const { tabsCss, locale, localeTranslations, localePluralize } = restProps

  const panelContainer = useRef(null)
  const panelInstance = useRef(null)

  const onTabChangeCallback = useCommitedCallback(onTabChange)
  const onChangeCallback = useCommitedCallback(onChange)
  const onProgressCallback = useCommitedCallback(onProgress)

  const metadataCommitedCallback = useCommitedCallback(metadataCallback)
  const previewUrlCommitedCallback = useCommitedCallback(
    previewUrlCallback || defaultPreviewUrlCallback
  )

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
    const files = getValueItems(value)
    panelInstance.current && panelInstance.current.reject()
    panelInstance.current = uploadcare.openPanel(
      panelContainer.current,
      files,
      {
        multipleMax: restProps.multiple ? undefined : 1,
        ...restProps,
        multiple: true,
        metadataCallback: restProps.metadata
          ? undefined
          : metadataCommitedCallback,
        previewUrlCallback: previewUrlCommitedCallback
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadcare, ...Object.values(restProps)])

  useEffect(() => {
    const dialogApi = panelInstance.current
    dialogApi.progress(onTabChangeCallback)

    const onChangeWrapper = () => {
      const items = panelInstance.current.fileColl.__items.map((deferred) =>
        deferred.promise()
      )
      onChangeCallback(items)
    }

    const onProgressWrapper = () => {
      const lastProgresses = panelInstance.current.fileColl.lastProgresses()
      onProgressCallback(lastProgresses)
    }

    dialogApi.fileColl.anyProgressList.add(onProgressWrapper)

    dialogApi.fileColl.anyDoneList.add(onChangeWrapper)
    dialogApi.fileColl.anyFailList.add(onChangeWrapper)
    dialogApi.fileColl.onRemove.add(onChangeWrapper)
    dialogApi.fileColl.onReplace.add(onChangeWrapper)
    dialogApi.fileColl.onSort.add(onChangeWrapper)

    return () => {
      const dialogApi = panelInstance.current

      dialogApi.fileColl.anyProgressList.remove(onProgressWrapper)

      dialogApi.fileColl.anyDoneList.remove(onChangeWrapper)
      dialogApi.fileColl.anyFailList.remove(onChangeWrapper)
      dialogApi.fileColl.onRemove.remove(onChangeWrapper)
      dialogApi.fileColl.onReplace.remove(onChangeWrapper)
      dialogApi.fileColl.onSort.remove(onChangeWrapper)
    }
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(restProps),
    onTabChangeCallback,
    onChangeCallback,
    onProgressCallback
  ])

  useImperativeHandle(
    apiRef,
    () => ({
      onTabVisibility: (cb) => panelInstance.current.onTabVisibility(cb),
      hideTab: (tab) => panelInstance.current.hideTab(tab),
      showTab: (tab) => panelInstance.current.showTab(tab),
      switchTab: (tab) => panelInstance.current.switchTab(tab),
      addFiles: (files) => panelInstance.current.addFiles(files),
      isTabVisible: (tab) => panelInstance.current.isTabVisible(tab),
      getFileColl: () => panelInstance.current.fileColl,
      getRawDialogApi: () => panelInstance.current
    }),
    []
  )

  useEffect(
    () => () => panelInstance.current && panelInstance.current.reject(),
    []
  )

  useEffect(() => {
    let isUpdated = false
    panelInstance.current.fileColl.clear()
    const files = getValueItems(value)
    for (const item of files) {
      if (typeof item === 'string' && item.includes('~')) {
        uploadcare.loadFileGroup(item, props).then((fileGroup) => {
          // value could be changed after group loaded
          if (!isUpdated) {
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
  const [containerId] = useState(() => `uploadcare-${Date.now()}`)
  const styleElement = useMemo(() => {
    return <style>{getHiddenDoneButtonStyle(containerId)}</style>
  }, [containerId])

  const [containerRef] = useDialog(props, uploadcare)

  return (
    <div id={props.id} className={containerId} style={containerStyles}>
      {styleElement}
      <div ref={containerRef} />
    </div>
  )
}

export default Dialog
