import { useEffect } from 'react'

export const useCustomTabs = (tabs, uploadcare) => {
  useEffect(() => {
    const customTabs = Object.entries(tabs || [])

    customTabs.forEach(([name, implementation]) => {
      uploadcare.registerTab(name, function (...args) {
        return implementation(...args, uploadcare)
      })
    })
  }, [tabs, uploadcare])
}
