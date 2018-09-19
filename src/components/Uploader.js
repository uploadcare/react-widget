import React, {Component} from 'react'
import uploadcare from 'uploadcare-widget'

class Uploader extends Component {
  componentDidMount() {
    const widget = uploadcare.Widget(this.uploader)
    const {value, onChange, onUploadComplete} = this.props

    if (typeof value !== 'undefined') {
      widget.value(value)
    }
    if (typeof onChange === 'function') {
      widget.onChange(files => {
        if (files) {
          this.files = (this.files && this.files.files) ? this.files.files() : [this.files]
        }
        else {
          this.files = null
        }

        onChange(files)
      })
    }
    if (typeof onUploadComplete === 'function') {
      widget.onUploadComplete(onUploadComplete)
    }
    widget.onDialogOpen(dialog => this.dialog = dialog)
  }

  componentWillUnmount() {
    if (this.dialog) {
      this.dialog.reject()
    }
    if (this.files) {
      uploadcare.jQuery.when.apply(null, this.files).cancel()
    }

    const widgetElement = uploadcare.jQuery(this.uploader).next('.uploadcare--widget')
    const widget = widgetElement.data('uploadcareWidget')

    if (widget && widget.inputElement === this.uploader) {
      widgetElement.remove()
    }
  }

  getInputAttributes() {
    const attributes = Object.assign({}, this.props)

    delete attributes.value
    delete attributes.onChange
    delete attributes.onUploadComplete

    return attributes
  }

  render() {
    const attributes = this.getInputAttributes()

    return (
      <input
        type='hidden'
        ref={input => this.uploader = input}
        {...attributes} />
    )
  }
}

export default Uploader
