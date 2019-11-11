import { useEffect } from 'react'

const useValidators = (widget, validators) => {
  useEffect(() => {
    if (validators != null) {
      const instance = widget.current

      validators.forEach(validator => {
        instance.validators.push(validator)
      })

      return () => {
        instance.validators.length = 0
      }
    }
  }, [widget, validators])
}

export { useValidators }
