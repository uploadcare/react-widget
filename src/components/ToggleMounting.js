import React, {Component} from 'react'

class ToggleMounting extends Component {
  constructor(props) {
    super(props)

    this.state = {mounted: true}
    this.handleMountClick = this.handleMountClick.bind(this)
  }

  handleMountClick() {
    this.setState({mounted: !this.state.mounted})
  }

  render() {
    const {children, title} = this.props
    const {mounted} = this.state

    return (
      <React.Fragment>
        {mounted ? children : null}
        <hr />
        <button
          type='button'
          onClick={this.handleMountClick}>
          {mounted ? 'Unmount' : 'Mount'} {title}
        </button>
      </React.Fragment>
    )
  }
}

export default ToggleMounting
