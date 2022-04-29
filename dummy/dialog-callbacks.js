import React from 'react'

import { Widget } from '../src/index.js'

export default () => {
  return (
    <>
      Multiple:
      <Widget
        multiple
        publicKey='demopublickey'
        onDialogOpen={() => console.log('Dialog opened')}
        onTabChange={(e) => console.log('Tab changed:', e)}
        onDialogClose={(e) => {
          console.log('Dialog closed')

          Promise.resolve()
            .then(() => e.promise())
            .then((e) => console.log('result: ', e))
            .catch(() => console.log('result: without files'))

          console.log(e.files())
        }}
      />

      Single:
      <Widget
        publicKey='demopublickey'
        onDialogClose={(e) => {
          Promise.resolve()
            .then(() => e.promise())
            .then((e) => console.log('result: ', e))
            .catch(() => console.log('result: without files'))

          console.log(e)
        }}
      />
    </>
  )
}
