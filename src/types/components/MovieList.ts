import type { InjectionKey, Ref } from 'vue'
import { Movie } from '../types'

export const movieListEntryMovieKey: InjectionKey<Movie | Omit<Movie, 'id'>> =
  Symbol('movieListEntryMovie')

export const movieListEntryClickCallbackKey: InjectionKey<{
  editMovie?: (movie: Movie) => void
  movieDetails?: (movie: Movie) => void
}> = Symbol('movieListEntryClickCallback')

export const movieListSingleColumnKey: InjectionKey<Ref<boolean>> = Symbol(
  'movieListSingleColumn',
)


