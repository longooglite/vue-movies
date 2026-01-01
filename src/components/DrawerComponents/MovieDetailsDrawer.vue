<script setup lang="ts">
import { computed } from 'vue'
import { useMovieDetailsStore } from '../../stores/movieDetailsStore/movieDetailsStore'
import { paragraphText } from '../../utils/paragraphText'

const movieDetailsStore = useMovieDetailsStore()
const movie = movieDetailsStore.movie
const posterUrl = computed(() => `https://image.tmdb.org/t/p/w185/${movie.tmdbPosterPath}`)
const watched = computed(() => {
  return movie.watched ? 'Yes' : 'No'
})
</script>
<template>
  <div class="movie-details-drawer">
    <div class="movie-details-drawer-content">
      <div v-if="movie.tmdbPosterPath" class="movie-details-drawer-poster">
        <img :src="posterUrl" alt="Movie Poster" />
      </div>
      <div class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Title</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.title }}</span>
      </div>
      <div class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Year</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.year }}</span>
      </div>
      <div class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Director</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.director }}</span>
      </div>
      <div v-if="movie.genre" class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Genre</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.genre }}</span>
      </div>
      <div v-if="movie.country" class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Country</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.country }}</span>
      </div>
      <div v-if="movie.description" class="movie-details-drawer-content-item description">
        <span class="movie-details-drawer-content-item-label">Description</span>
        <span class="movie-details-drawer-content-item-value">{{ paragraphText(movie.description) }}</span>
      </div>
      <div v-if="movie.format" class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Format</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.format }}</span>
      </div>
      <div v-if="movie.label" class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Label</span>
        <span class="movie-details-drawer-content-item-value">{{ movie.label }}</span>
      </div>
      <div v-if="movie.watched !== undefined" class="movie-details-drawer-content-item">
        <span class="movie-details-drawer-content-item-label">Watched</span>
        <span class="movie-details-drawer-content-item-value">{{ watched }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>

.movie-details-drawer-poster {
  float: left;
  margin-right: 10px;
  padding: 10px;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.movie-details-drawer-content-item {
  margin-bottom: 10px;
}
.movie-details-drawer-content-item-label {
  font-weight: bold;
  margin-right: 10px;
}
.movie-details-drawer-content-item-value {
  font-weight: normal;
  text-transform: capitalize;
}
.movie-details-drawer-content-item.description .movie-details-drawer-content-item-value {
  text-transform: none;
}
</style>