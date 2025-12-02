import type { InjectionKey, Ref } from 'vue'
import { Movie } from '../types'

export const movieListEntryMovieKey: InjectionKey<Movie | Omit<Movie, 'id'>> =
  Symbol('movieListEntryMovie')

export const movieListEntryClickCallbackKey: InjectionKey<
  ((movie: Movie) => void) | undefined
> = Symbol('movieListEntryClickCallback')

export const movieListSingleColumnKey: InjectionKey<Ref<boolean>> = Symbol(
  'movieListSingleColumn',
)


