/* eslint-env mocha */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import assert from 'assert'

import Uploader from '../src/uploader'
import Dialog from '../src/dialog'

afterEach(cleanup)

describe('Widget', function () {
  it('should renders without errors', function () {
    const { container } = render(<Uploader />)
    const status = container
      .querySelector('.uploadcare--widget')
      .getAttribute('data-status')

    assert.strictEqual(status, 'ready')
  })
})

describe('Panel', function () {
  it('should renders without errors', function () {
    const { container } = render(<Dialog />)
    const panel = container.querySelector('.uploadcare--panel')

    assert.notStrictEqual(panel, null)
  })
})
