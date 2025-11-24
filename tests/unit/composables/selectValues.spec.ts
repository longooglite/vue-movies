import { describe, it, expect } from 'vitest'
import { countryOptions, formatOptions, labelOptions, genreOptions, selectFormat, selectLabel, selectGenre, selectCountry } from '@/composables/selectValues'
import { ref } from 'vue'
import type { Movie } from '@/types/types'

describe('selectValues composable', () => {
  it('countryOptions returns unique, sorted countries from movies', () => {
    const movies: Movie[] = [
      { id: '1', title: 'A', year: 2000, director: 'D', country: 'US' },
      { id: '2', title: 'B', year: 2001, director: 'D', country: 'CA' },
      { id: '3', title: 'C', year: 2002, director: 'D', country: 'US' },
    ]
    expect(countryOptions(movies)).toEqual(['CA', 'US'])
  })
  it('formatOptions returns unique, sorted formats from movies', () => {
    const movies: Movie[] = [
      { id: '1', title: 'A', year: 2000, director: 'D', format: 'DVD' },
      { id: '2', title: 'B', year: 2001, director: 'D', format: 'BluRay' },
      { id: '3', title: 'C', year: 2002, director: 'D', format: 'BluRay' },
    ]
    expect(formatOptions(movies)).toEqual(['BluRay', 'DVD'])
  })
  it('labelOptions returns unique, sorted labels from movies', () => {
    const movies: Movie[] = [
      { id: '1', title: 'A', year: 2000, director: 'D', label: 'C' },
      { id: '2', title: 'B', year: 2001, director: 'D', label: 'A' },
      { id: '3', title: 'C', year: 2002, director: 'D', label: 'B' },
    ]
    expect(labelOptions(movies)).toEqual(['A', 'B', 'C'])
  })
  it('genreOptions returns unique, sorted genres from movies', () => {
    const movies: Movie[] = [
      { id: '1', title: 'A', year: 2000, director: 'D', genre: 'Drama' },
      { id: '2', title: 'B', year: 2001, director: 'D', genre: 'Action' },
      { id: '3', title: 'C', year: 2002, director: 'D', genre: 'Drama' },
    ]
    expect(genreOptions(movies)).toEqual(['Action', 'Drama'])
  })
  it('selectFormat sets the provided ref to the new format', () => {
    const r = ref<string | null>(null)
    selectFormat('BluRay', r)
    expect(r.value).toBe('BluRay')
  })
  it('selectLabel sets the provided ref to the new label', () => {
    const r = ref<string | null>(null)
    selectLabel('C', r)
    expect(r.value).toBe('C')
  })
  it('selectGenre sets the provided ref to the new genre', () => {
    const r = ref<string[] | string | null>(null)
    selectGenre('Drama', r)
    expect(r.value).toBe('Drama')
  })
  it('selectCountry sets the provided ref to the new country', () => {
    const r = ref<string | null>(null)
    selectCountry('US', r)
    expect(r.value).toBe('US')
  })
})


