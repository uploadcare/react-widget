/* eslint-env jest */
import React from 'react'
import { render } from '@testing-library/react'

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
})

describe('Panel', function () {
  it('should renders without errors', function () {
    const { container } = render(<Dialog />)
    const panel = container.querySelector('.uploadcare--panel')

    expect(panel).toBeDefined()
  })
})
