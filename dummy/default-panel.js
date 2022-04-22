import React, { useRef } from 'react'

import { Panel } from '../src'

export default () => {
  const ref = useRef()

  return (
    <Panel
      ref={ref}
      value={[
        'cced07ed-50f4-49fa-b37f-8a40b5754dff',
        'https://ucarecdn.com/fdfe4e67-f747-4993-91f5-be21d6d3c1a6/-/preview/760x500/-/progressive/yes/-/format/auto/-/quality/normal/',
        '9ef9af26-7356-4428-b69c-1b920f947989~2'
      ]}
      multiple
      publicKey="demopublickey"
      onTabChange={(e) => console.log('onTabChange', e)}
      onProgress={(progress) => console.log('onProgress', progress)}
      onChange={(files) => {
        Promise.allSettled(files).then((results) =>
          console.log('onChange', results)
        )
      }}
    />
  )
}
