import { describe, it, expect } from 'vitest'
import { multiSelectValidator } from '@/utils/validators/multiSelectValidator'
import { FILTER_KEYS, type Movie } from '@/types/types'

describe('multiSelectValidator', () => {
  it('returns false when movie field is missing', () => {
    const movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
    } as Movie
    expect(multiSelectValidator(FILTER_KEYS.GENRE)(movie, ['Drama'])).toBe(false)
  })
  it('returns true when movie field (array) overlaps selections', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      genre: ['Drama', 'Action'],
    }
    expect(multiSelectValidator(FILTER_KEYS.GENRE)(movie, ['Comedy', 'Drama'])).toBe(
      true,
    )
  })
  it('returns true when movie field (scalar) is included in selections', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      format: 'BluRay',
    }
    expect(multiSelectValidator(FILTER_KEYS.FORMAT)(movie, ['DVD', 'BluRay'])).toBe(
      true,
    )
  })
  it('returns false when there is no overlap with selections', () => {
    const movie: Movie = {
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      genre: ['Horror'],
    }
    expect(multiSelectValidator(FILTER_KEYS.GENRE)(movie, ['Drama'])).toBe(false)
  })
})


