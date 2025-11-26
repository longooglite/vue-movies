import { describe, it, expect } from 'vitest'
import { buildMovieData, buildDirectorData, buildWatchedData, buildCountryData } from '@/utils/buildMovieData'
import { FILTER_KEYS, type Movie } from '@/types/types'

const makeMovie = (overrides: Partial<Movie> = {}): Movie => ({
  id: overrides.id ?? Math.random().toString(36).slice(2),
  title: overrides.title ?? 'Untitled',
  year: overrides.year ?? 2000,
  director: overrides.director ?? 'Unknown',
  decade: overrides.decade,
  country: overrides.country,
  genre: overrides.genre,
  watched: overrides.watched,
  format: overrides.format,
  label: overrides.label,
  tmdbId: overrides.tmdbId,
  tmdbPosterPath: overrides.tmdbPosterPath,
  description: overrides.description,
})

describe('buildMovieData', () => {
  it('returns empty array for empty input', () => {
    const byDirector = buildMovieData(FILTER_KEYS.DIRECTOR)
    expect(byDirector([])).toEqual([])
  })

  it('groups by director and sorts by movie count descending', () => {
    const movies: Movie[] = [
      makeMovie({ title: 'A1', director: 'DirA' }),
      makeMovie({ title: 'A2', director: 'DirA' }),
      makeMovie({ title: 'B1', director: 'DirB' }),
      makeMovie({ title: 'A3', director: 'DirA' }),
      makeMovie({ title: 'C1', director: 'DirC' }),
    ]

    const result = buildMovieData(FILTER_KEYS.DIRECTOR)(movies)

    expect(result.map((d) => d[FILTER_KEYS.DIRECTOR])).toEqual(['DirA', 'DirB', 'DirC'])
    expect(result[0].movies).toHaveLength(3)
  })

  it('works via convenience builder buildDirectorData', () => {
    const movies: Movie[] = [
      makeMovie({ title: 'X1', director: 'X' }),
      makeMovie({ title: 'X2', director: 'X' }),
      makeMovie({ title: 'Y1', director: 'Y' }),
    ]

    const result = buildDirectorData(movies)

    expect(result).toHaveLength(2)
    expect(result[0][FILTER_KEYS.DIRECTOR]).toBe('X')
    expect(result[0].movies.map((m) => m.title)).toEqual(['X1', 'X2'])
  })

  it('groups boolean values (watched) into true/false buckets', () => {
    const movies: Movie[] = [
      makeMovie({ title: 'M1', watched: true }),
      makeMovie({ title: 'M2', watched: false }),
      makeMovie({ title: 'M3', watched: true }),
    ]

    const result = buildWatchedData(movies)

    // true group should come first (count 2), then false (count 1)
    expect(result.map((g) => g[FILTER_KEYS.WATCHED] as boolean)).toEqual([true, false])
    expect(result[0].movies).toHaveLength(2)
    expect(result[1].movies).toHaveLength(1)
  })

  it('includes undefined values as their own bucket', () => {
    const movies: Movie[] = [
      makeMovie({ title: 'C1', country: 'US' }),
      makeMovie({ title: 'C2', country: undefined }),
      makeMovie({ title: 'C3', country: 'US' }),
    ]

    const result = buildCountryData(movies)

    // Two buckets: 'US' (2 movies) then undefined (1 movie)
    expect(result[0][FILTER_KEYS.COUNTRY]).toBe('US')
    expect(result[0].movies).toHaveLength(2)
    expect(result[1][FILTER_KEYS.COUNTRY]).toBeUndefined()
    expect(result[1].movies).toHaveLength(1)
  })
})
