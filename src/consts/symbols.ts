import { InjectionKey } from "vue"
import { Movie } from "../types/types"

export const movieDetailsProviderKey = Symbol('movieDetailsProviderKey') as InjectionKey<Movie>
export const editMovieProviderKey = Symbol('editMovieProviderKey') as InjectionKey<Movie>
export const createMovieProviderKey = Symbol('createMovieProviderKey') as InjectionKey<Omit<Movie, 'id'>>
export const screenSizeProviderKey = Symbol('screenSizeProviderKey') as InjectionKey<string>