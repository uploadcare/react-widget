import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import { Widget } from '../src'

const Example = () => {
  const [, rerender] = useReducer(state => !state, false)

  const newFn = () => rerender()

  return <Widget publicKey='demopublickey' onFileSelect={newFn} />
}

ReactDOM.render(<Example />, document.getElementById('root'))
