import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import uploadcare from 'uploadcare-widget'

const Uploader = (...props) => {
  const uploader = useRef()

  useEffect(() => {
    const widget = uploadcare.SingleWidget(uploader.current)

    if (typeof value !== 'undefined') {
      widget.value(props.value)
    }
    if (typeof onChange === 'function') {
      widget.onChange(files => {
        if (files) {
          let files = files && files.files ? files.files() : [files]
        }
        else {
          return null
        }

        props.onChange(files)
      })
    }
    if (typeof onUploadComplete === 'function') {
      widget.onUploadComplete(props.onUploadComplete)
    }
    if (props.clearImage) {
      widget.value(null)
    }
    widget.onDialogOpen(dialog => dialog)

    return () => {
      if (widget.dialog) {
        widget.dialog.reject()
      }
      if (widget.files) {
        uploadcare.jQuery.when.apply(null, widget.files).cancel()
      }

      const widgetElement = uploadcare.jQuery(uploader).next('.uploadcare--widget')
      const widget = widgetElement.data('uploadcareWidget')

      if (widget && widget.inputElement === uploader) {
        widgetElement.remove()
      }
    }
  }, [])

  const getInputAttributes = () => {
    const attributes = Object.assign({}, props)

    delete attributes.value
    delete attributes.onChange
    delete attributes.onUploadComplete

    return attributes
  }
  const attributes = getInputAttributes()

  return (
    <input
      type='hidden'
      ref={uploader}
      {...attributes} />
  )
}

Uploader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onUploadComplete: PropTypes.func,
  clearImage: PropTypes.bool,
}

export default Uploader
