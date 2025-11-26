<script setup lang="ts">
import { inject, provide, ref, type Ref } from 'vue'
import { Movie } from '../../../types/types'
import MovieListEntryTitle from './MovieListEntryTitle/MovieListEntryTitle.vue'
import MovieListEntryDetails from './MovieListEntryDetails/MovieListEntryDetails.vue'

const props = defineProps<{
  movie: Movie | Omit<Movie, 'id'>
}>()
const extendedDetails = ref(false)
provide('movie-list-entry-movie', props.movie)
const singleColumn = inject('movie-list-single-column') as Ref<boolean>
const showDetails = ref(
  Boolean(
    props.movie.country ||
      props.movie.genre ||
      props.movie.watched ||
      props.movie.format ||
      props.movie.label,
  ),
)
</script>
<template>
  <div
    class="movie-list-entry"
    :class="{ 'single-column': singleColumn, 'double-column': !singleColumn }"
    :style="{ height: extendedDetails ? 'auto' : '100px' }"
  >
    <MovieListEntryTitle :title="String(props.movie.title)" />
    <MovieListEntryDetails movieKey="director" />
    <MovieListEntryDetails movieKey="year" />
    <button
      v-if="showDetails"
      @click="extendedDetails = !extendedDetails"
      class="movie-list-entry-extended-details-button"
    >
      {{ extendedDetails ? 'Hide Details' : 'Show Details' }}
    </button>
    <div class="movie-list-extended-details-container" v-if="extendedDetails">
      <MovieListEntryDetails v-if="props.movie.country" movieKey="country" />
      <MovieListEntryDetails v-if="props.movie.genre" movieKey="genre" />
      <MovieListEntryDetails v-if="props.movie.watched" movieKey="watched" />
      <MovieListEntryDetails v-if="props.movie.format" movieKey="format" />
      <MovieListEntryDetails v-if="props.movie.label" movieKey="label" />
    </div>
  </div>
</template>
<style scoped>
.movie-list-entry {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(50% - 20px);
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  margin-bottom: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
  transition: height 0.1s ease-in-out;
  interpolate-size: allow-keywords;
}
.movie-list-entry.single-column {
  width: calc(100% - 50px);
  border-left: none;
}
.movie-list-entry.double-column:nth-child(even) {
  margin-left: 10px;
}
.movie-list-entry-extended-details-button {
  background: none;
  outline: none;
  padding: 5px 10px;
  border: none;
  cursor: pointer;

  margin: 0 auto;
  font-size: 0.8rem;
}
.movie-list-entry-extended-details-button:hover {
  text-decoration: underline;
}
</style>
