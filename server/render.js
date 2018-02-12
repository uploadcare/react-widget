import React from 'react'
import {renderToString} from 'react-dom/server'
import App from '../src/App'

export default function(req, res) {
  const html = renderToString(
    <App />
  )

  res.render('template.ejs', {html})
}
