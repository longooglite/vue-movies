import { describe, it, expect } from 'vitest'
import { booleanValidator } from '@/utils/validators/booleanValidator'
import { FILTER_KEYS, type Movie } from '@/types/types'

describe('booleanValidator', () => {
  it('returns true when movie boolean matches the filter value', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      watched: true,
    }
    expect(booleanValidator(FILTER_KEYS.WATCHED)(movie, true)).toBe(true)
  })
  it('returns false when movie boolean does not match the filter value', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      watched: false,
    }
    expect(booleanValidator(FILTER_KEYS.WATCHED)(movie, true)).toBe(false)
  })
})


