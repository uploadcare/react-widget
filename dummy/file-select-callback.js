import React, { useReducer } from 'react'

import { Widget } from '../src'

export default () => {
  const [, rerender] = useReducer(state => !state, false)

  const newFn = () => rerender()

  return <Widget publicKey='demopublickey' onFileSelect={newFn} />
}
