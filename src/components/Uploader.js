import React, {Component} from "react";
import uploadcare from "uploadcare-widget";

class Uploader extends Component {

  componentDidMount() {
    uploadcare.start({
      publicKey: "demopublickey",
      tabs: "all"
    });
  }

  render() {
    return (
      <div>
        <input type="text" role="uploadcare-uploader"/>
      </div>
    )
  }
}

export default Uploader;
