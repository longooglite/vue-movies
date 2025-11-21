<script setup lang="ts">
import { provide } from 'vue'
import { tmdbSearchProviderKey } from '../types/providers/TMDBSearchProvider'
import { 
    type CastAndCrewResult,
    type Crew,
    type Cast, 
    type TMDBMovie, 
    type SearchResultsReturn, 
    type TMDBMovieDetailsReturn, 
    type Movie
} from '../types/types'
import { releaseDateToYear } from '../utils/releaseDateToYear'
import { searchResultToAWSMovie } from '../utils/transformers/searchResultToAwsMovie'
const TMDB_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TMDB_BEARER_TOKEN
        }
    }
const fetchCastAndCrew = async (movieId: string) => {
    const creditsUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}/credits?language=en-US`

    const res = await fetch(creditsUrl, TMDB_OPTIONS)
    const { crew, cast: allCast} = await res.json() as CastAndCrewResult
    const director = crew.find(({job}: Crew) => job === 'Director') as Crew
    const rawCast = allCast.filter(({known_for_department}: Cast) => known_for_department === 'Acting').splice(0, 7)
    const cast = rawCast.sort(({cast_id: castIdA}, {cast_id: castIdB}) => castIdA - castIdB).map(({name}) => name)
    return { director, cast }
}


const fetchSearch = async (query: string): Promise<TMDBMovie[]> => {
    const searchUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/search/movie?query=${encodeURI(query)}&include_adult=true&language=en-US&page=1`
    

   const res = await fetch(searchUrl, TMDB_OPTIONS)
   const { results } = await res.json() as SearchResultsReturn
   return results
}

const fetchMovieDetails = async (movieId: string): Promise<TMDBMovieDetailsReturn> => {
    const movieDetailsUrl = `${import.meta.env.VITE_TMDB_API_BASE_URL}/movie/${movieId}?language=en-US`
    const res = await fetch(movieDetailsUrl, TMDB_OPTIONS)
    return await res.json() as TMDBMovieDetailsReturn
}

const search = async (query: string): Promise<Movie[]> => {
    const movies = await fetchSearch(query)
    const results = await Promise.all(movies.map(async (movie) => {
        const castAndCrew = await fetchCastAndCrew(String(movie?.id))
        return { ...movie, ...castAndCrew }
    }))
    return results.map((result) => searchResultToAWSMovie(result))
}

const movieDetailsToMovieData = (
    movieDetails: TMDBMovieDetailsReturn,
    director: string
): Omit<Movie, 'id'> => {
    return {
        title: movieDetails.title,
        year: releaseDateToYear(movieDetails.release_date),
        director: director,
        tmdbPosterPath: movieDetails.poster_path ?? '',
        description: movieDetails.overview ?? '',
        tmdbId: movieDetails.id.toString(),
    }
}

const getMovieDetails = async (movieId: string): Promise<Omit<Movie, 'id'>> => {
    const movieDetails = await fetchMovieDetails(movieId)
    const { director: {original_name: director} } = await fetchCastAndCrew(movieId)

    return movieDetailsToMovieData(movieDetails, director)
}
provide(tmdbSearchProviderKey, { search, getMovieDetails })

</script>
<template>
    <slot></slot>
</template>