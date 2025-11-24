import { Movie, SearchMovieResult } from '../../types/types'

const populateOptionalFields = (
  searchMovieResult: SearchMovieResult,
): Movie => {
  return Object.entries({
    title: searchMovieResult?.title,
    year: Number(searchMovieResult.release_date.split('-')[0]),
    director: searchMovieResult?.director
      ? searchMovieResult.director.name
      : '',
    tmdbId: searchMovieResult?.id.toString(),
    description: searchMovieResult?.overview,
    tmdbPosterPath: searchMovieResult?.poster_path,
    tmdbDescription: searchMovieResult?.overview,
  })
    .filter(([_, value]) => value !== undefined)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value
        return acc
      },
      {} as Record<string, string | number | boolean | undefined>,
    ) as Movie
}

export const searchResultToAWSMovie = (
  searchMovieResult: SearchMovieResult,
): Movie => {
  return populateOptionalFields(searchMovieResult)
}
