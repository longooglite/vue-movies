import { TriStateBooleanValues } from '../../types/components/FormComponents/FormComponents'

export const triStateBooleanValueToBoolean = (value: TriStateBooleanValues) => {
  switch (value) {
    case TriStateBooleanValues.TRUE:
      return true
    case TriStateBooleanValues.FALSE:
      return false
    case TriStateBooleanValues.NULL:
      return null
  }
}
