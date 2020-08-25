import React, { useReducer } from 'react'
import { Widget } from '..'


const translation = (text) => ({
  dialog: {
    tabs: {
      file: { drag: text }
    }
  }
})

const Test = () => {
  const [value, toggle] = useReducer((v) => !v, true)

  return (
    <>
      <button onClick={toggle}>Change text</button>

      <Widget
        publicKey='demopublickey'
        localeTranslations={translation(
          value ? 'Wow!' : 'So dynamic!'
        )}
      />
    </>
  )
}

export default Test
