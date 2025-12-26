<script setup lang="ts">
import { computed, inject } from 'vue'
import { movieDetailsProviderKey } from '../../types/providers/MovieDetailProvider'
import { MovieDetailsProviderReturn } from '../../types/providers/MovieDetailProvider'

const { movieDetails } = inject(movieDetailsProviderKey) as MovieDetailsProviderReturn  

const movie = computed(() => movieDetails.value)
</script>
<template>
  <div class="movie-details-form">
    <h1>Movie Details</h1>
    {{ JSON.stringify(movie, null, 2) }}
  </div>
</template>
<style scoped>
.movie-details-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>