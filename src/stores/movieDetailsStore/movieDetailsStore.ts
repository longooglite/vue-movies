import { defineStore } from "pinia"
import { ref } from "vue"
import { Movie } from "../../types/types"
import { DEFAULT_MOVIE } from "../../consts/globals"

export const useMovieDetailsStore = defineStore(
    'movieDetails', () => {
        const movie = ref<Movie>(DEFAULT_MOVIE)
        const setMovie = (newMovie: Movie) => {
            movie.value = newMovie
        }
    return {
        movie,
        setMovie,
    }
})