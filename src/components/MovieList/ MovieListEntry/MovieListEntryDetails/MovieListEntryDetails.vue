<script setup lang="ts">
import { computed, inject } from 'vue'
import { Movie } from '../../../../types/types'
const movie = inject('movie-list-entry-movie') as Movie
const props = defineProps<{
  movieKey: string
}>()
const value = computed(() => {
  return movie[props.movieKey as keyof Movie]
})
</script>
<template>
  <div class="movie-list-entry-details">
    <span class="movie-list-entry-details-key">{{ props.movieKey }}:</span>
    <span class="movie-list-entry-details-value">{{
      value?.toString() ?? ''
    }}</span>
  </div>
</template>
<style scoped>
.movie-list-entry-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.movie-list-entry-details-key {
  text-transform: capitalize;
  margin-right: 10px;
}
.movie-list-entry-details-value {
  font-weight: normal;
}
</style>
