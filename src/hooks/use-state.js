import { useReducer } from 'react'

const merge = (state, newState) => ({ ...state, ...newState })

export const useState = (initial) => useReducer(merge, initial || {})
