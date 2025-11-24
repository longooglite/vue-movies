import { describe, it, expect } from 'vitest'
import { FILTER_KEYS, type Movie } from '@/types/types'
import { stringValidator } from '@/utils/validators/stringValidator'

describe('stringValidator', () => {
  it('returns false when movie field is missing or empty', () => {
    const movieMissing = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
    } as Movie
    expect(stringValidator(FILTER_KEYS.DIRECTOR)(movieMissing, 'x')).toBe(false)

    const movieEmpty = {
      id: '1',
      title: 'T',
      year: 2000,
      director: '',
    } as Movie
    expect(stringValidator(FILTER_KEYS.DIRECTOR)(movieEmpty, 'x')).toBe(false)
  })
  it('matches case-insensitively when substring is present', () => {
    const movie: Movie = {
      id: '1',
      title: 'The Matrix',
      year: 1999,
      director: 'Lana Wachowski',
    }
    expect(stringValidator(FILTER_KEYS.TITLE)(movie, 'matrix')).toBe(true)
    expect(stringValidator(FILTER_KEYS.DIRECTOR)(movie, 'LANA')).toBe(true)
  })
  it('returns false when substring is not present', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
    }
    expect(stringValidator(FILTER_KEYS.TITLE)(movie, 'xyz')).toBe(false)
  })
})


