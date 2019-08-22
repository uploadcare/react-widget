import { useEffect } from 'react'

const useValidators = (widget, validators) => {
  useEffect(() => {
    if (validators != null) {
      const instance = widget.current
      const _validators = new Set(validators)

      instance.validators = [...instance.validators, ...validators]

      return () => {
        instance.validators = instance.validators.filter(validator => !_validators.has(validator))
      }
    }
  }, [widget, validators])
}

export {
  useValidators
}
