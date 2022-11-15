import React from 'react'
import effects from 'uploadcare-widget-tab-effects'
import { Panel } from '../src'

export default () => {
  return (
    <Panel
      publicKey='demopublickey'
      previewStep
      customTabs={{ preview: effects }}
      onChange={files => console.log(files)}
    />
  )
}
