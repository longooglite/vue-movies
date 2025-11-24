import { TriStateBooleanValues } from '../../types/components/FormComponents/FormComponents'

export const booleanToTriStateBooleanValue = (value: boolean | null) => {
  switch (value) {
    case true:
      return TriStateBooleanValues.TRUE
    case false:
      return TriStateBooleanValues.FALSE
    case null:
      return TriStateBooleanValues.NULL
  }
}
