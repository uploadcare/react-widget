import { useEffect } from 'react'

const useValidators = (widget, validators) => {
  useEffect(() => {
    if (validators != null) {
      const instanse = widget.current
      const _validators = new Set(validators)

      instanse.validators = [...instanse.validators, ...validators]

      return () => {
        instanse.validators = instanse.validators.filter(validator => !_validators.has(validator))
      }
    }
  }, [widget, validators])
}

export {
  useValidators
}
