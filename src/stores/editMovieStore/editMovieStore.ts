import { defineStore } from 'pinia'
import { Movie } from '../../types/types'
import { ref } from 'vue'
import { DEFAULT_MOVIE } from '../../consts/globals'

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
