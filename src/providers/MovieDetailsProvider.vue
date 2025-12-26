<script setup lang="ts">
import { provide } from 'vue'
import { movieDetailsProviderKey } from '../types/providers/MovieDetailProvider'
import { useMovieDetailsStore } from '../stores/movieDetailsStore/movieDetailsStore'
import { MovieDetailsProviderReturn } from '../types/providers/MovieDetailProvider'
import { computed } from 'vue'

const movieDetailsStore = useMovieDetailsStore()
const movieDetails = computed(() => movieDetailsStore.movie)

const providedValue: MovieDetailsProviderReturn = {
  movieDetails,
  setMovieDetails: movieDetailsStore.setMovie,
}

provide(movieDetailsProviderKey, providedValue)
</script>
<template>
  <slot></slot>
</template>