/* eslint-env jest */
import React from 'react'
import {
  render,
  getByText,
  getByTitle,
  waitFor,
  fireEvent
} from '@testing-library/react'

import Uploader from '../src/uploader'
import Dialog from '../src/dialog'

describe('Uploader', function () {
  it('should renders without errors', function () {
    const { container } = render(<Uploader />)
    const status = container
      .querySelector('.uploadcare--widget')
      .getAttribute('data-status')

    expect(status).toBe('ready')
  })

  it('should trigger dialog open/close callbacks', async function () {
    const onDialogClose = jest.fn()
    const dialogOpen = jest.fn()
    const tabChange = jest.fn()

    const { container } = render(
      <Uploader
        publicKey="demopublickey"
        onDialogOpen={dialogOpen}
        onTabChange={tabChange}
        onDialogClose={onDialogClose}
      />
    )

    fireEvent(
      getByText(container, 'Choose a file'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() => expect(dialogOpen).toHaveBeenCalledTimes(1))
    expect(tabChange).toHaveBeenCalledTimes(1)

    fireEvent(
      getByTitle(container.parentNode, 'Close'),
      new window.MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )

    await waitFor(() => expect(onDialogClose).toHaveBeenCalledTimes(1))
  })
})

describe('Panel', function () {
  it('should renders without errors', function () {
    const { container } = render(<Dialog />)
    const panel = container.querySelector('.uploadcare--panel')

    expect(panel).toBeDefined()
  })
})
