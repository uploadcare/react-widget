
/* eslint-env jest */
import React from 'react'
import {
  render,
  getByText,
  fireEvent
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Uploader from '../src/uploader'

describe('Uploader', function () {
  it('should change locales dynamicaly', async function () {
    const { container, rerender } = render(
      <Uploader
        publicKey='demopublickey'
        locale='en'
      />
    )

    expect(getByText(container, 'Choose a file')).toBeInTheDocument()

    rerender(
      <Uploader
        publicKey='demopublickey'
        locale='ru'
      />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    expect(getByText(container.nextSibling, 'Выберите локальный файл')).toBeInTheDocument()
  })
})
