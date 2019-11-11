import { useEffect } from 'react'

const noop = function() {}

export const useCustomTabs = (tabs, uploadcare) => {
  useEffect(() => {
    const customTabs = Object.entries(tabs || [])

    customTabs.forEach(([name, implementation]) => {
      uploadcare.registerTab(name, function(...args) {
        return implementation(...args, uploadcare)
      })
    })

    return () =>
      customTabs.forEach(([name]) => uploadcare.registerTab(name, noop))
  }, [tabs, uploadcare])
}
