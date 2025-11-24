import { describe, it, expect } from 'vitest'
import { searchResultToAWSMovie } from '@/utils/transformers/searchResultToAWSMovie'
import type { SearchMovieResult } from '@/types/types'

describe('searchResultToAWSMovie', () => {
  it('maps fields correctly and omits undefined values', () => {
    const input = {
      director: {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Directing',
        name: 'Dir',
        original_name: 'Dir',
        popularity: 1,
        profile_path: '',
        credit_id: 'x',
        department: 'Directing',
        job: 'Director',
      },
      cast: [],
      adult: false,
      backdrop_path: undefined as unknown as string,
      genre_ids: [1],
      id: 42,
      original_language: 'en',
      original_title: 'OT',
      overview: undefined as unknown as string,
      popularity: 0,
      poster_path: '/p.jpg',
      release_date: '2010-10-11',
      title: 'T',
    } as SearchMovieResult
    const movie = searchResultToAWSMovie(input)
    expect(movie).toMatchObject({
      title: 'T',
      year: 2010,
      director: 'Dir',
      tmdbId: '42',
      tmdbPosterPath: '/p.jpg',
    })
    // Ensure undefined fields are not added (backdrop is not part of mapping)
    expect((movie as any).backdrop_path).toBeUndefined()
  })

  it('uses director.name when present, otherwise empty string', () => {
    const withDirector = searchResultToAWSMovie({
      director: {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Directing',
        name: 'N',
        original_name: 'N',
        popularity: 1,
        profile_path: '',
        credit_id: 'x',
        department: 'Directing',
        job: 'Director',
      },
      cast: [],
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 1,
      original_language: 'en',
      original_title: 'OT',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '2000-01-01',
      title: 'T',
    })
    expect(withDirector.director).toBe('N')

    const withoutDirector = searchResultToAWSMovie({
      // @ts-expect-error – simulate missing director
      director: undefined,
      cast: [],
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 1,
      original_language: 'en',
      original_title: 'OT',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '2000-01-01',
      title: 'T',
    } as unknown as SearchMovieResult)
    expect(withoutDirector.director).toBe('')
  })

  it('converts id to string and year to number', () => {
    const movie = searchResultToAWSMovie({
      director: {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Directing',
        name: 'N',
        original_name: 'N',
        popularity: 1,
        profile_path: '',
        credit_id: 'x',
        department: 'Directing',
        job: 'Director',
      },
      cast: [],
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 999,
      original_language: 'en',
      original_title: 'OT',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '1995-05-20',
      title: 'T',
    })
    expect(typeof movie.tmdbId).toBe('string')
    expect(movie.tmdbId).toBe('999')
    expect(movie.year).toBe(1995)
  })
})


