import type {InjectionKey, Ref} from 'vue'
import { Filter, Movie } from '../types'

export interface MovieFilterProviderReturn {
    filteredMovies: Ref<Movie[]>
    filters: Ref<Filter[]>
    updateActiveFilters: (filterName: string, filterValue: any) => void
}
export const movieFilterProviderKey: InjectionKey<MovieFilterProviderReturn> = Symbol('movieFilterProvider');