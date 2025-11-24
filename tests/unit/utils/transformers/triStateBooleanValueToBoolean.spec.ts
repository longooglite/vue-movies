import { describe, it, expect } from 'vitest'
import { triStateBooleanValueToBoolean } from '@/utils/transformers/triStateBooleanValueToBoolean'
import { TriStateBooleanValues } from '@/types/components/FormComponents/TriStateBoolean'

describe('triStateBooleanValueToBoolean', () => {
  it('returns true for TriStateBooleanValues.TRUE', () => {
    expect(triStateBooleanValueToBoolean(TriStateBooleanValues.TRUE)).toBe(true)
  })
  it('returns false for TriStateBooleanValues.FALSE', () => {
    expect(triStateBooleanValueToBoolean(TriStateBooleanValues.FALSE)).toBe(false)
  })
  it('returns null for TriStateBooleanValues.NULL', () => {
    expect(triStateBooleanValueToBoolean(TriStateBooleanValues.NULL)).toBeNull()
  })
})


