import React from 'react'
import ReactDOM from 'react-dom'

import File from './file-select-callback'
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
    text: 'rerendering on file select callback fire',
    component: File
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
