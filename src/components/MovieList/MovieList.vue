<script setup lang="ts">
import MovieListEntry from './ MovieListEntry/MovieListEntry.vue'
import { Movie } from '../../types/types'
import { provide, computed } from 'vue'
import {
  movieListEntryClickCallbackKey,
  movieListSingleColumnKey,
} from '../../types/components/MovieList'

const props = defineProps<{
  movies: Movie[] | Omit<Movie, 'id'>[]
  loading: boolean
  clickCallbacks?: {
    editMovie?: (movie: Movie) => void
    movieDetails?: (movie: Movie) => void
  }
  singleColumn?: boolean
}>()
provide(movieListEntryClickCallbackKey, props.clickCallbacks ?? {})
provide(movieListSingleColumnKey, computed(() => Boolean(props.singleColumn)))
</script>

<template>
  <div class="movie-list">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <MovieListEntry
      v-for="movie in movies"
      :movie="movie"
      :key="
        String(movie.id) + '-' + String(movie.title) + '-' + String(movie.year)
      "
    />
  </div>
</template>
<style scoped>
.movie-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px 0 20px;
}
</style>
