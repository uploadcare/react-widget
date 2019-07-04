/* eslint-env mocha */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import assert from 'assert'

import Uploader from '../src/uploader'

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
