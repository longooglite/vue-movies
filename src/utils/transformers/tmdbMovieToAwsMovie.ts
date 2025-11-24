import { Movie, SearchMovieResult } from '../../types/types'
import { releaseDateToYear } from '../releaseDateToYear'

export const searchResultToAwsMovie = (
  tmdbMovie: SearchMovieResult,
  director: string,
): Omit<Movie, 'id'> => {
  return {
    title: tmdbMovie.title,
    year: releaseDateToYear(tmdbMovie.release_date),
    director: director,
    tmdbId: tmdbMovie.id.toString(),
    tmdbPosterPath: tmdbMovie.poster_path,
  }
}
