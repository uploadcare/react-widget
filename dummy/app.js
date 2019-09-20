import React from 'react'
import ReactDOM from 'react-dom'

import File from './file-select-callback'
import Panel from './default-panel'

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
  }
]

ReactDOM.render(
  examples.map((props, key) => <Example key={key} {...props} />),
  document.getElementById('root')
)
