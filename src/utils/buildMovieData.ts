import { FILTER_KEYS, Movie } from "../types/types"

interface MovieData {
  [key: string]: string | number | boolean | string[] | undefined | Movie[]
  movies: Movie[]
}

export const buildMovieData = (filterKey: FILTER_KEYS) => (movies: Movie[]) => {
  const data = movies.reduce((acc: MovieData[], movie: Movie) => {
    const currentValue = movie[filterKey]
    const existing = acc.find((item) => item[filterKey] === currentValue)
    if (existing) {
      return [
        ...acc.filter((item) => item[filterKey] !== currentValue),
        {
          [filterKey]: currentValue,
          movies: [...existing?.movies, movie],
        },
      ]
    } else {
      return [
        ...acc,
        {
          [filterKey]: currentValue,
          movies: [movie],
        },
      ]
    }
  }, []).sort((a: MovieData, b: MovieData) => {
    return b.movies.length - a.movies.length
  })
  const sortedData = data.sort((a: MovieData, b: MovieData) => {
    return b.movies.length - a.movies.length
  })
  return sortedData
}
export const buildCountryData = buildMovieData(FILTER_KEYS.COUNTRY)
export const buildDecadeData = buildMovieData(FILTER_KEYS.DECADE)
export const buildGenreData = buildMovieData(FILTER_KEYS.GENRE)
export const buildFormatData = buildMovieData(FILTER_KEYS.FORMAT)
export const buildWatchedData = buildMovieData(FILTER_KEYS.WATCHED)
export const buildDirectorData = buildMovieData(FILTER_KEYS.DIRECTOR)
export const buildTitleData = buildMovieData(FILTER_KEYS.TITLE)