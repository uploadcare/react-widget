import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle
} from 'react'
import uploadcare from 'uploadcare-widget'

import {
  useEventCallback,
  useCustomTabs,
  useValidators,
  useDeepMemo
} from './hooks'

function camelCaseToDash (str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

const propsToAttr = (props) =>
  Object.entries(props).reduce(
    (attr, [key, value]) => ({
      ...attr,
      [`data-${camelCaseToDash(key)}`]: value
    }),
    {}
  )

const useWidget = (
  {
    id,
    name,
    value,
    onFileSelect,
    onChange,
    onDialogOpen,
    onDialogClose,
    onTabChange,
    apiRef,
    customTabs,
    validators,
    ...options
  },
  uploadcare
) => {
  const input = useRef(null)
  const widget = useRef(null)

  const fileSelectedCallback = useEventCallback(onFileSelect)
  const changeCallback = useEventCallback(onChange)
  const dialogOpenCallback = useEventCallback(onDialogOpen)
  const dialogCloseCallback = useEventCallback(onDialogClose)
  const tabChangeCallback = useEventCallback(onTabChange)

  useCustomTabs(customTabs, uploadcare)

  const attributes = useDeepMemo(() => propsToAttr(options), [options])

  useEffect(() => {
    widget.current = uploadcare.Widget(input.current)
    const widgetElement = input.current.nextSibling

    return () => widgetElement && widgetElement.remove()
  }, [uploadcare, attributes])

  useValidators(widget, validators)

  useEffect(() => {
    widget.current.onUploadComplete.add(changeCallback)
    widget.current.onChange.add(fileSelectedCallback)

    return () => {
      widget.current.onUploadComplete.remove(changeCallback)
      widget.current.onChange.remove(fileSelectedCallback)
    }
  }, [changeCallback, fileSelectedCallback])

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
  }, [attributes, dialogCloseCallback, dialogOpenCallback, tabChangeCallback])

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
  }, [attributes])

  useEffect(() => {
    widget.current.value(value)
  }, [value])

  useImperativeHandle(
    apiRef,
    () => ({
      openDialog: () => widget.current.openDialog(),
      reloadInfo: () => widget.current.reloadInfo(),
      getInput: () => widget.current.inputElement
    }),
    []
  )

  return useCallback(
    () => (
      <input type='hidden' ref={input} id={id} name={name} {...attributes} />
    ),
    [attributes, id, name]
  )
}

const Uploader = (props) => {
  const Input = useWidget(props, uploadcare)

  return <Input />
}

export default Uploader
