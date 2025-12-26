<script setup lang="ts">
import { inject } from 'vue'
import { Movie } from '../../../../types/types'
import { PhPencilSimple, PhInfo } from '@phosphor-icons/vue'
import {
  movieListEntryMovieKey,
  movieListEntryClickCallbackKey,
} from '../../../../types/components/MovieList'
import { screenSizeProviderKey, ScreenSize } from '../../../../types/providers/ScreenSizeProvider'

const props = defineProps<{
  expand: boolean
}>()

const screenSize = inject(screenSizeProviderKey)
const movie = inject(movieListEntryMovieKey) as Movie
const clickCallbacks = inject(movieListEntryClickCallbackKey) as {
  editMovie?: (movie: Movie) => void
  movieDetails?: (movie: Movie) => void
}
const editMovieClickCallback = () => {
  if (clickCallbacks?.editMovie) {
    clickCallbacks.editMovie(movie)
  }
}
const movieDetailsClickCallback = () => {
  console.log(movie)
  console.log(clickCallbacks)
  if (clickCallbacks?.movieDetails) {
    clickCallbacks.movieDetails(movie)
  }
}
</script>
<template>
  <div class="movie-list-entry-title-menu" :class="{
    open: props.expand || screenSize === ScreenSize.MOBILE
  }">
    <button
      v-if="clickCallbacks?.editMovie"
      @click="editMovieClickCallback"
      class="movie-list-entry-title-menu-button"
    >
      <PhPencilSimple />
    </button>
    <button 
      v-if="clickCallbacks?.movieDetails" 
      @click="movieDetailsClickCallback"
      class="movie-list-entry-title-menu-button"
    >
      <PhInfo class="movie-list-entry-title-menu-icon" />
    </button>
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
  display: flex;
  gap: 5px;
  margin-left: 5px;
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
