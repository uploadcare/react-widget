import { useEffect, useLayoutEffect } from 'react'

const isReactNative =
  typeof global !== 'undefined' &&
  global.navigator &&
  global.navigator.product === 'ReactNative'

const isDOM = typeof document !== 'undefined'

/**
 * Is `useLayoutEffect` in a DOM or React Native environment, otherwise resolves to useEffect
 * Only useful to avoid the console warning.
 *
 * PREFER `useEffect` UNLESS YOU KNOW WHAT YOU ARE DOING.
 */
export const useIsomorphicEffect =
  isDOM || isReactNative ? useLayoutEffect : useEffect
