<script setup lang="ts">
import { inject } from 'vue'
import { Movie } from '../../../../types/types'
import { PhPencilSimple } from '@phosphor-icons/vue'
import {
  movieListEntryMovieKey,
  movieListEntryClickCallbackKey,
} from '../../../../types/components/MovieList'

const props = defineProps<{
  expand: boolean
}>()

const movie = inject(movieListEntryMovieKey) as Movie
const clickCallback = inject(movieListEntryClickCallbackKey) as (
  movie: Movie,
) => void
const onClick = () => {
  if (clickCallback) {
    clickCallback(movie)
  }
}
</script>
<template>
  <div class="movie-list-entry-title-menu" :class="{ open: props.expand }">
    <button @click="onClick"><PhPencilSimple /></button>
  </div>
</template>
<style scoped>
.movie-list-entry-title-menu {
  width: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  display: block;
  overflow: hidden;
  interpolate-size: allow-keywords;
  top: 0;
  left: 100%;
  transition: width 0.1s ease-in-out;
}
.movie-list-entry-title-menu.open {
  width: auto;
}
.movie-list-entry-title-menu > button {
  background: none;
  outline: none;
  padding: 0;
  border: none;
  cursor: pointer;
}
.movie-list-entry-title-menu > * {
  word-break: keep-all !important;
  white-space: nowrap !important;
}
</style>
