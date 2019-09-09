import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react'
import uploadcare from 'uploadcare-widget'

import {
  useDestructuring,
  useEventCallback,
  useCustomTabs,
  useValidators
} from './hooks'

function camelCaseToDash (str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

const propsToAttr = props =>
  Object.entries(props).reduce(
    (attr, [key, value]) => ({
      ...attr,
      [`data-${camelCaseToDash(key)}`]: value
    }),
    {}
  )

const useWidget = (props, uploadcare) => {
  const [
    value,
    onFileSelect,
    onChange,
    apiRef,
    customTabs,
    validators,
    options
  ] = useDestructuring(
    ({
      value,
      onFileSelect,
      onChange,
      apiRef,
      customTabs,
      validators,
      ...options
    }) => [
      value,
      onFileSelect,
      onChange,
      apiRef,
      customTabs,
      validators,
      options
    ],
    props
  )

  const input = useRef(null)
  const widget = useRef(null)

  const fileSelectedCallback = useEventCallback(onFileSelect)
  const changeCallback = useEventCallback(onChange)

  useCustomTabs(customTabs, uploadcare)

  const attributes = useMemo(() => propsToAttr(options), [options])

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
  }, [uploadcare, attributes, changeCallback, fileSelectedCallback])

  useEffect(() => {
    let dialog
    const saveDialog = ref => (dialog = ref)

    widget.current.onDialogOpen.add(saveDialog)

    return () => {
      dialog && dialog.reject()
      widget.current.onDialogOpen.remove(saveDialog)
    }
  }, [uploadcare, attributes])

  useEffect(() => {
    let files = []
    const saveFiles = file => {
      if (file) {
        files = file.files ? file.files() : [file]
      } else {
        files = []
      }
    }

    widget.current.onChange.add(saveFiles)

    return () => {
      files.forEach(file => file.cancel())
      widget.current.onChange.remove(saveFiles)
    }
  }, [uploadcare, attributes])

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
    () => <input type='hidden' ref={input} {...attributes} />,
    [attributes]
  )
}

const Uploader = props => {
  const Input = useWidget(props, uploadcare)

  return <Input />
}

export default Uploader
