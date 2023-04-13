/* eslint-env jest */
import {jest} from '@jest/globals'

Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true })
