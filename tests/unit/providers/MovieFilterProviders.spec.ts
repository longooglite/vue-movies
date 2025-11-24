// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { createApp, defineComponent, h, inject, onMounted, ref, type Ref } from 'vue'
import MovieFilterProviders from '@/providers/MovieFilterProviders.vue'
import { awsMovieProviderKey, type AwsMovieProviderReturn } from '@/types/providers/AwsMovieProvider'
import { movieFilterProviderKey, type MovieFilterProviderReturn } from '@/types/providers/MovieFilterProvider'
import type { Movie } from '@/types/types'

describe('MovieFilterProviders', () => {
  const mountWithMovies = (initialMovies: Movie[]) => {
    const moviesRef: Ref<Movie[]> = ref(initialMovies)
    const awsProvider: AwsMovieProviderReturn = {
      movies: moviesRef,
      loading: ref(false),
      error: ref(null),
      refetch: () => {},
      updateMovie: async () => ({} as any),
      createMovie: async () => ({} as any),
    }

    let provided: MovieFilterProviderReturn | null = null

    const Probe = defineComponent({
      emits: ['ready'],
      setup(_, { emit }) {
        const p = inject(movieFilterProviderKey) as MovieFilterProviderReturn
        onMounted(() => emit('ready', p))
        return () => null
      },
    })

    const Root = defineComponent({
      setup() {
        return () =>
          h(MovieFilterProviders, null, {
            default: () =>
              h(Probe, {
                onReady: (p: MovieFilterProviderReturn) => {
                  provided = p
                },
              }),
          })
      },
    })

    const app = createApp(Root)
    app.provide(awsMovieProviderKey, awsProvider)
    const el = document.createElement('div')
    app.mount(el)

    if (!provided) {
      throw new Error('Provider not captured from probe')
    }
    return { app, el, moviesRef, provided }
  }

  it('updateActiveFilters activates and sets values when provided', () => {
    const { provided } = mountWithMovies([
      { id: '1', title: 'A', year: 2000, director: 'D' },
    ])
    expect(provided).toBeTruthy()
    provided.updateActiveFilters('year', 2000)
    const yearFilter = provided.filters.value.find((f) => f.key === 'year')!
    expect(yearFilter.active).toBe(true)
    expect(yearFilter.value).toBe(2000)
  })

  it('updateActiveFilters deactivates and clears when value is null', () => {
    const { provided } = mountWithMovies([
      { id: '1', title: 'A', year: 2000, director: 'D' },
    ])
    provided.updateActiveFilters('year', 2000)
    provided.updateActiveFilters('year', null)
    const yearFilter = provided.filters.value.find((f) => f.key === 'year')!
    expect(yearFilter.active).toBe(false)
    expect(yearFilter.value).toBeNull()
  })

  it('filterMovies returns all movies when no filters are active', () => {
    const { provided } = mountWithMovies([
      { id: '1', title: 'A', year: 2000, director: 'D' },
      { id: '2', title: 'B', year: 2001, director: 'E' },
    ])
    expect(provided.filteredMovies.value).toHaveLength(2)
  })

  it('filterMovies applies all active validators with AND logic', () => {
    const { provided } = mountWithMovies([
      {
        id: '1',
        title: 'A',
        year: 2000,
        director: 'D',
        country: 'US',
        genre: 'Drama',
        watched: true,
        format: 'BluRay',
      },
      {
        id: '2',
        title: 'B',
        year: 2001,
        director: 'E',
        country: 'CA',
        genre: 'Action',
        watched: false,
        format: 'DVD',
      },
    ])
    provided.updateActiveFilters('country', ['US'])
    provided.updateActiveFilters('genre', ['Drama'])
    provided.updateActiveFilters('watched', true)
    provided.updateActiveFilters('format', ['BluRay'])
    expect(provided.filteredMovies.value.map((m) => m.id)).toEqual(['1'])
  })

  it('filters by year when year filter is active', () => {
    const { provided } = mountWithMovies([
      { id: '1', title: 'A', year: 2000, director: 'D' },
      { id: '2', title: 'B', year: 2001, director: 'E' },
    ])
    provided.updateActiveFilters('year', 2001)
    expect(provided.filteredMovies.value.map((m) => m.id)).toEqual(['2'])
  })

  it('provides decade options derived from movies', () => {
    const { provided } = mountWithMovies([
      { id: '1', title: 'A', year: 1995, decade: '1990s', director: 'D' } as Movie,
      { id: '2', title: 'B', year: 2001, decade: '2000s', director: 'E' } as Movie,
    ])
    const decadeFilter = provided.filters.value.find((f) => f.key === 'decade') as any
    expect(decadeFilter.options).toEqual(['1990s', '2000s'])
  })
})


