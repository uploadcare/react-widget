/* eslint-env mocha */
import React from 'react'
import { render } from '@testing-library/react'
import assert from 'assert'

import Uploader from '../src/uploader'
import Dialog from '../src/dialog'

describe('Uploader', function() {
  it('should renders without errors', function() {
    const { container } = render(<Uploader />)
    const status = container
      .querySelector('.uploadcare--widget')
      .getAttribute('data-status')

    assert.strictEqual(status, 'ready')
  })
})

describe('Panel', function() {
  it('should renders without errors', function() {
    const { container } = render(<Dialog />)
    const panel = container.querySelector('.uploadcare--panel')

    assert.notStrictEqual(panel, null)
  })
})
