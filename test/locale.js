/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect'
import {
  fireEvent,
  getByText,
  getByTitle,
  render,
  waitFor
} from '@testing-library/react'
import React from 'react'

import Uploader from '../src/uploader'

describe('Uploader', function () {
  it('should change locales dynamicaly', async function () {
    const { container, rerender, unmount } = render(
      <Uploader publicKey="demopublickey" locale="en" />
    )

    expect(getByText(container, 'Choose a file')).toBeInTheDocument()

    rerender(<Uploader publicKey="demopublickey" locale="ru" />)

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    expect(
      getByText(container.nextSibling, 'Выберите локальный файл')
    ).toBeInTheDocument()
    unmount()
  })

  it('should change labels dynamicaly', async function () {
    const translation = (text) => ({
      dialog: {
        tabs: {
          file: { drag: text }
        }
      }
    })

    const { container, rerender, unmount } = render(
      <Uploader
        publicKey="demopublickey"
        localeTranslations={translation('wow!')}
      />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() =>
      expect(getByText(container.nextSibling, 'wow!')).toBeInTheDocument()
    )

    fireEvent(
      getByTitle(container.nextSibling, 'Close'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    rerender(
      <Uploader
        publicKey="demopublickey"
        localeTranslations={translation('dynamic!')}
      />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() =>
      expect(getByText(container.nextSibling, 'dynamic!')).toBeInTheDocument()
    )
    unmount()
  })

  it('should allow return default translation', async function () {
    const translation = (text) => ({
      dialog: {
        tabs: {
          file: { button: text }
        }
      }
    })

    const { container, rerender } = render(
      <Uploader
        publicKey="demopublickey"
        localeTranslations={translation('yay!')}
      />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() =>
      expect(getByText(container.nextSibling, 'yay!')).toBeInTheDocument()
    )

    fireEvent(
      getByTitle(container.nextSibling, 'Close'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    rerender(
      <Uploader publicKey="demopublickey" localeTranslations={undefined} />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() =>
      expect(
        getByText(container.nextSibling, 'Choose a local file')
      ).toBeInTheDocument()
    )
  })
})
