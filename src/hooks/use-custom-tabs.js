import { useEffect } from 'react'

const noop = () => null

export const useCustomTabs = (tabs, uploadcare) => {
  useEffect(() => {
    const customTabs = Object.entries(tabs || [])

    customTabs.forEach(([name, implementation]) => {
      uploadcare.registerTab(name, (...args) =>
        implementation(...args, uploadcare)
      )
    })

    return () =>
      customTabs.forEach(([name]) => uploadcare.registerTab(name, noop))
  }, [tabs, uploadcare])
}
