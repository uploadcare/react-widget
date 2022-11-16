import React from 'react'
import { Widget } from '../src'

export default () => {
  return (
    <Widget
      publicKey='demopublickey'
      previewStep
      onChange={file => console.log(file)}
      // metadata={{metadata: 'metadata'}}
      metadataCallback={() => ({metadataCallback: 'metadataCallback'})}
    />
  )
}
