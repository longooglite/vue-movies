import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEditMovieStore } from '@/stores/editMovieStore/editMovieStore'

describe('editMovieStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default movie state', () => {
    const store = useEditMovieStore()
    expect(store.movie).toBeDefined()
    expect(store.movie.id).toBe('')
    expect(store.movie.title).toBe('')
    expect(store.movie.year).toBe(0)
    expect(store.movie.director).toBe('')
    expect(store.movie.decade).toBe('')
    expect(store.movie.country).toBe('')
    expect(store.movie.genre).toEqual([])
  })

  it('setMovie replaces the current movie', () => {
    const store = useEditMovieStore()
    store.setMovie({
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      decade: '2000s',
      country: 'US',
      genre: ['Drama'],
    })
    expect(store.movie).toMatchObject({
      id: '1',
      title: 'T',
      year: 2000,
      director: 'D',
      decade: '2000s',
      country: 'US',
      genre: ['Drama'],
    })
  })
})


