
import React from 'react'

import { Panel } from '../src'

export default () => {
  return (
    <Panel
      publicKey="demopublickey"
      onChange={(files) => {
        Promise.allSettled(files).then((results) =>
          console.log('onChange', results)
        )
      }}
      // metadata={{metadata: 'metadata'}}
      metadataCallback={() => ({metadataCallback: 'metadataCallback'})}
    />
  )
}
