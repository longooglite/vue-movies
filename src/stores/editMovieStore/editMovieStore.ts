import { defineStore } from 'pinia'
import { Movie } from '../../types/types'
import { ref } from 'vue'

const DEFAULT_MOVIE: Movie = {
  id: '',
  title: '',
  year: 0,
  director: '',
  decade: '',
  country: '',
  genre: [],
}

export const useEditMovieStore = defineStore('editMovie', () => {
  const movie = ref<Movie>(DEFAULT_MOVIE)
  const setMovie = (newMovie: Movie) => {
    movie.value = newMovie
  }
  return {
    movie,
    setMovie,
  }
})
