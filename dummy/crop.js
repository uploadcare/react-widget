import React from 'react'
import { Widget } from '../src'

export default () => {
  return (
    <Widget
      publicKey="demopublickey"
      crop="1:1"
      onChange={file => console.log(file)}
    />
  )
}
