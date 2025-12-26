import { InjectionKey, Ref } from "vue"
import { Movie } from "../types"

export interface MovieDetailsProviderReturn {
  movieDetails: Ref<Movie>
  setMovieDetails: (movieDetails: Movie) => void
}

export const movieDetailsProviderKey = Symbol('movieDetailsProviderKey') as InjectionKey<MovieDetailsProviderReturn>