export interface Movie {
  [key: string]: string | number | boolean | string[] | undefined
  id: string
  title: string
  year: number
  director: string
  decade?: string
  country?: string
  genre?: string[] | string
  watched?: boolean
  format?: string
  label?: string
  tmdbId?: string
  tmdbPosterPath?: string
  description?: string
}
export interface DirectorData {
  director: string
  movies: Movie[]
}
export interface CountryData {
  country: string
  movies: Movie[]
}
export interface DecadeData {
  decade: string
  movies: Movie[]
}
export interface GenreData {
  genre: string
  movies: Movie[]
}

export interface FormatData {
  format: string
  movies: Movie[]
}

export interface WatchedData {
  watched: boolean
  movies: Movie[]
}
export interface DirectorData {
  director: string
  movies: Movie[]
}

export enum FILTER_KEYS {
  YEAR = 'year',
  DECADE = 'decade',
  COUNTRY = 'country',
  GENRE = 'genre',
  WATCHED = 'watched',
  DIRECTOR = 'director',
  TITLE = 'title',
  FORMAT = 'format',
}

export interface Filter {
  key: FILTER_KEYS
  type: 'number' | 'single select' | 'multi select' | 'boolean' | 'string'
  active: boolean
  value: number | string | string[] | boolean | null
  validator: (Movie: Movie, value: any) => boolean
}

export interface NumberFilter extends Filter {
  type: 'number'
  value: number | null
  validator: (Movie: Movie, value: number) => boolean
}

export interface SingleSelectFilter extends Filter {
  type: 'single select'
  value: string | null
  options: string[]
  validator: (Movie: Movie, value: string) => boolean
}

export interface MultiSelectFilter extends Filter {
  type: 'multi select'
  value: string[] | null
  options: string[]
  validator: (Movie: Movie, value: string[]) => boolean
}

export interface BooleanFilter extends Filter {
  type: 'boolean'
  value: boolean | null
  validator: (Movie: Movie, value: boolean) => boolean
}

export interface StringFilter extends Filter {
  type: 'string'
  value: string | null
  validator: (Movie: Movie, value: string) => boolean
}

export interface TMDBMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchMovieResult {
  director: Crew
  cast: string[]
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Crew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface CastAndCrewResult {
  id: number
  cast: Cast[]
  crew: Crew[]
}

export interface SearchResultsReturn {
  page: number
  total_pages: number
  total_results: number
  results: TMDBMovie[]
}

export interface TMDBMovieDetailsReturn {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  } | null
  budget: number
  genres: Array<{
    id: number
    name: string
  }>
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: Array<{
    id: number
    name: string
    logo_path: string
    origin_country: string
  }>
  production_countries: Array<{
    iso_3166_1: string
    name: string
  }>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<{
    iso_639_1: string
    name: string
  }>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
