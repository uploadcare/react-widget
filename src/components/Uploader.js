import React, {Component} from "react";
import uploadcare from "uploadcare-widget";

class Uploader extends Component {

  componentDidMount() {
    const {id, onChange} = this.props;
    const widget = uploadcare.Widget(`#${id}`);

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
    const {id, name, ...attrs} = this.props;

    return (<input type="hidden" id={id} name={name} {...attrs} />)
  }
}

export default Uploader;
