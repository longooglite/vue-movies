import { FILTER_KEYS, Movie } from '../../types/types'

export const stringValidator =
  (filterKey: FILTER_KEYS) =>
  (movie: Movie, value: string): boolean => {
    if (!movie[filterKey]) return false
    return String(movie[filterKey]).toLowerCase().includes(value.toLowerCase())
  }
