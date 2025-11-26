<script setup lang="ts">
import { computed, inject, provide, reactive } from 'vue'
import { movieFilterProviderKey } from '../types/providers/MovieFilterProvider'
import {
  awsMovieProviderKey,
  type AwsMovieProviderReturn,
} from '../types/providers/AwsMovieProvider'
import {
  BooleanFilter,
  Filter,
  FILTER_KEYS,
  Movie,
  MultiSelectFilter,
  NumberFilter,
  SingleSelectFilter,
  StringFilter,
} from '../types/types'
import { multiSelectValidator } from '../utils/validators/multiSelectValidator'
import { booleanValidator } from '../utils/validators/booleanValidator'
import { stringValidator } from '../utils/validators/stringValidator'

const { movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const FILTERS: (
  | Filter
  | NumberFilter
  | SingleSelectFilter
  | MultiSelectFilter
  | BooleanFilter
  | StringFilter
)[] = reactive([
  {
    key: FILTER_KEYS.YEAR,
    type: 'number',
    active: false,
    value: null,
    validator: (movie: Movie, value: number) => {
      return movie[FILTER_KEYS.YEAR] === value
    },
  },
  {
    key: FILTER_KEYS.DECADE,
    type: 'multi select',
    active: false,
    value: null,
    options:
      movies.value
        .filter((movie: Movie) => movie.decade)
        .map((movie: Movie) => movie.decade as string),
    validator: multiSelectValidator(FILTER_KEYS.DECADE),
  },
  {
    key: FILTER_KEYS.COUNTRY,
    type: 'multi select',
    active: false,
    value: null,
    options:
      movies.value
        .filter((movie: Movie) => movie.country)
        .map((movie: Movie) => movie.country as string),
    validator: multiSelectValidator(FILTER_KEYS.COUNTRY),
  },
  {
    key: FILTER_KEYS.GENRE,
    type: 'multi select',
    active: false,
    value: null,
    options:
      movies.value
        .filter((movie: Movie) => movie.genre)
        .map((movie: Movie) => movie.genre as string),
    validator: multiSelectValidator(FILTER_KEYS.GENRE),
  },
  {
    key: FILTER_KEYS.FORMAT,
    type: 'multi select',
    active: false,
    value: null,
    options:
      movies.value
        .filter((movie: Movie) => movie.format)
        .map((movie: Movie) => movie.format as string),
    validator: multiSelectValidator(FILTER_KEYS.FORMAT),
  },
  {
    key: FILTER_KEYS.WATCHED,
    type: 'boolean',
    active: false,
    value: null,
    validator: booleanValidator(FILTER_KEYS.WATCHED),
  },
  {
    key: FILTER_KEYS.DIRECTOR,
    type: 'string',
    active: false,
    value: null,
    validator: stringValidator(FILTER_KEYS.DIRECTOR),
  },
  {
    key: FILTER_KEYS.TITLE,
    type: 'string',
    active: false,
    value: null,
    validator: stringValidator(FILTER_KEYS.TITLE),
  },
])

const updateActiveFilters = (filterName: string, filterValue: any) => {
  const filter = FILTERS.find((filter) => filter.key === filterName)
  if (filter && filterValue !== null) {
    filter.active = true
    filter.value = filterValue
  }
  if (filter && filterValue === null) {
    filter.active = false
    filter.value = null
  }
}

const filterMovies = (movies: Movie[]) => {
  const filteredMovies = movies.filter((movie) => {
    return FILTERS.every((filter) => {
      if (!filter.active) return true
      return filter.validator(movie, filter.value)
    })
  })
  return filteredMovies
}

const providedValue = {
  filteredMovies: computed(() => filterMovies(movies.value)),
  updateActiveFilters,
  filters: computed(() => FILTERS),
}

provide(movieFilterProviderKey, providedValue)

</script>

<template><slot></slot></template>
