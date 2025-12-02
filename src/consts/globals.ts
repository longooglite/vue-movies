import { Movie } from "../types/types"

export const MOBILE_BREAKPOINT = 640
export const TOP_ITEMS_COUNT = 10

export const DEFAULT_MOVIE: Movie = {
  id: '',
  title: '',
  year: 0,
  director: '',
  decade: '',
  country: '',
  genre: [],
  watched: false,
  format: '',
  label: '',
  tmdbId: '',
  tmdbPosterPath: '',
  description: '',
}