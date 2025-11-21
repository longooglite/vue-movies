import { defineStore } from 'pinia'
import { Movie } from '../../types/types'
import { ref } from 'vue'

const DEFAULT_MOVIE: Omit<Movie, 'id'> = {
    title: '',
    year: 0,
    director: '',
    decade: '',
    country: '',
    genre: [],
}

export const useCreateMovieStore = defineStore('editMovie', () => {
    const movie = ref<Omit<Movie, 'id'>>(DEFAULT_MOVIE)
    const setMovie = (newMovie: Omit<Movie, 'id'>) => {
        movie.value = newMovie
    }
    return {
        movie,
        setMovie
    }
})