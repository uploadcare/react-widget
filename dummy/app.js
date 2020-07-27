import React from 'react'
import ReactDOM from 'react-dom'

import Callbacks from './dialog-callbacks'
import Panel from './default-panel'
import Effect from './effect'
import Crop from './crop'

const Example = ({ text, component: Component }) => (
  <div>
    <h2>{text}</h2>

    <br />
    <br />

    <Component />

    <hr />
  </div>
)

const examples = [
  {
    text: 'New callbacks',
    component: Callbacks
  },
  {
    text: 'default panel example',
    component: Panel
  },
  {
    text: 'crop',
    component: Crop
  },
  {
    text: 'effects',
    component: Effect
  }
]

ReactDOM.render(
  examples.map((props, key) => <Example key={key} {...props} />),
  document.getElementById('root')
)
