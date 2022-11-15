import { useDeepEffect } from './use-deep-effect'

export const useCustomTabs = (tabs, uploadcare) => {
  useDeepEffect(() => {
    const customTabs = Object.entries(tabs || [])

    customTabs.forEach(([name, implementation]) => {
      uploadcare.registerTab(name, function (...args) {
        return implementation(...args, uploadcare)
      })
    })
  }, [tabs, uploadcare])
}
