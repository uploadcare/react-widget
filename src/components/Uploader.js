import React, {Component} from 'react'
import uploadcare from 'uploadcare-widget'

class Uploader extends Component {
  componentDidMount() {
    const {onChange} = this.props
    const widget = uploadcare.Widget(this.uploader)

    if (onChange && typeof onChange === 'function') {
      widget.onChange((file) => {
        if (file) {
          file
            .done(info => onChange(info.cdnUrl))
            .fail(() => onChange(null))
        }
        else {
          onChange(null)
        }
      })
    }
  }

  render() {
    return (<input type='hidden' ref={input => this.uploader = input} {...this.props} />)
  }
}

export default Uploader
