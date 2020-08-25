import React from 'react'
import effects from 'uploadcare-widget-tab-effects'
import { Widget } from '../src'

const translation = {
  effects: {
    apply: 'Применити'
  }
}

export default () => {
  return (
    <Widget
      publicKey='demopublickey'
      localeTranslations={translation}
      previewStep
      customTabs={{ preview: effects }}
      onChange={file => console.log(file)}
    />
  )
}
