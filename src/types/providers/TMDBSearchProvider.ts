import { InjectionKey } from 'vue'
import { Movie } from '../types'

export interface TMDBSearchProviderReturn {
  search: (query: string) => Promise<Movie[]>
  getMovieDetails: (movieId: string) => Promise<Omit<Movie, 'id'>>
}

export const tmdbSearchProviderKey: InjectionKey<TMDBSearchProviderReturn> =
  Symbol('tmdbSearchProvider')
