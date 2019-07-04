import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import uploadcare from 'uploadcare-widget'

import { useDestructuring } from './hooks/use-destructuring'

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
    onChange,
    onUploadComplete,
    customTabs,
    validator,
    options
  ] = useDestructuring(
    ({
      value,
      onChange,
      onUploadComplete,
      customTabs,
      validator,
      ...options
    }) => [value, onChange, onUploadComplete, customTabs, validator, options],
    props
  )

  const input = useRef(null)
  const widget = useRef(null)

  const onChangeCallback = useRef(onChange)
  const onUploadCompleteCallback = useRef(onUploadComplete)

  useEffect(() => {
    onChangeCallback.current = onChange
  }, [onChange])

  useEffect(() => {
    onUploadCompleteCallback.current = onUploadComplete
  }, [onUploadComplete])

  useEffect(() => {
    Object.entries(customTabs || []).forEach(([name, implementation]) => {
      uploadcare.registerTab(name, implementation)
    })
  }, [customTabs, uploadcare])

  const attributes = useMemo(() => propsToAttr(options), [options])

  useEffect(() => {
    widget.current = uploadcare.Widget(input.current)
    const widgetElement = input.current.nextSibling

    return () => widgetElement && widgetElement.remove()
  }, [uploadcare, attributes])

  useEffect(() => {
    if (validator != null) {
      widget.current.validators.push(validator)
    }
  }, [validator])

  useEffect(() => {
    const compliteHandler = (...args) => {
      if (typeof onUploadCompleteCallback.current === 'function') {
        onUploadCompleteCallback.current(...args)
      }
    }

    const changeHandler = (...args) => {
      if (typeof onChangeCallback.current === 'function') {
        onChangeCallback.current(...args)
      }
    }

    widget.current.onUploadComplete.add(compliteHandler)
    widget.current.onChange.add(changeHandler)

    return () => {
      widget.current.onUploadComplete.remove(compliteHandler)
      widget.current.onChange.remove(changeHandler)
    }
  }, [uploadcare, attributes])

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
