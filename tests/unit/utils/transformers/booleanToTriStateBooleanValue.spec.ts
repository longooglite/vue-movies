import { describe, it, expect } from 'vitest'
import { booleanToTriStateBooleanValue } from '@/utils/transformers/booleanToTriStateBooleanValue'
import { TriStateBooleanValues } from '@/types/components/FormComponents/FormComponents'
describe('booleanToTriStateBooleanValue', () => {
  it('returns TRUE for true', () => {
    expect(booleanToTriStateBooleanValue(true)).toBe(TriStateBooleanValues.TRUE)
  })
  it('returns FALSE for false', () => {
    expect(booleanToTriStateBooleanValue(false)).toBe(TriStateBooleanValues.FALSE)
  })
  it('returns NULL for null', () => {
    expect(booleanToTriStateBooleanValue(null)).toBe(TriStateBooleanValues.NULL)
  })
})


