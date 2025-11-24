import { describe, it, expect } from 'vitest'
import { searchResultToAWSMovie } from '@/utils/transformers/searchResultToAwsMovie'
import type { SearchMovieResult } from '@/types/types'
import { releaseDateToYear } from '@/utils/releaseDateToYear'

describe('searchResultToAwsMovie (TMDB variant)', () => {
  it('maps title, year via releaseDateToYear, director, id string, poster path', () => {
    const input: SearchMovieResult = {
      director: {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Directing',
        name: 'Some Director',
        original_name: 'Some Director',
        popularity: 1,
        profile_path: '',
        credit_id: 'abc',
        department: 'Directing',
        job: 'Director',
      },
      cast: [],
      adult: false,
      backdrop_path: '/back.jpg',
      genre_ids: [1, 2],
      id: 123,
      original_language: 'en',
      original_title: 'OT',
      overview: 'desc',
      popularity: 0,
      poster_path: '/poster.jpg',
      release_date: '2001-02-03',
      title: 'Title',
    }
    const director = 'Some Director'
    const movie = searchResultToAWSMovie(input)
    expect(movie).toMatchObject({
      title: 'Title',
      year: releaseDateToYear('2001-02-03'),
      director: 'Some Director',
      tmdbId: '123',
      tmdbPosterPath: '/poster.jpg',
    })
  })

  it('handles missing optional fields gracefully', () => {
    const input = {
      // make some fields undefined to simulate missing optional data
      director: {
        adult: false,
        gender: 2,
        id: 1,
        known_for_department: 'Directing',
        name: 'D',
        original_name: 'D',
        popularity: 1,
        profile_path: '',
        credit_id: 'abc',
        department: 'Directing',
        job: 'Director',
      },
      cast: [],
      adult: false,
      backdrop_path: undefined as unknown as string,
      genre_ids: [],
      id: 5,
      original_language: 'en',
      original_title: 'OT',
      overview: undefined as unknown as string,
      popularity: 0,
      poster_path: undefined as unknown as string,
      release_date: '1999-01-01',
      title: 'X',
    } as SearchMovieResult
    const movie = searchResultToAWSMovie(input)
    expect(movie.title).toBe('X')
    expect(movie.year).toBe(1999)
    expect(movie.tmdbId).toBe('5')
  })
})


