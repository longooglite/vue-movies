import { FILTER_KEYS, Movie } from "../../types/types"

export const booleanValidator =
    (filterKey: FILTER_KEYS) => 
        (movie: Movie, value: boolean): boolean => 
            movie[filterKey] === value