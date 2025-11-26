<script setup lang="ts">

import { computed, inject, ref} from 'vue'
import { awsMovieProviderKey } from '../../../types/providers/AwsMovieProvider'
import { AwsMovieProviderReturn } from '../../../types/providers/AwsMovieProvider'
import { buildCountryData, buildDecadeData, buildDirectorData } from '../../../utils/buildMovieData'
import { Movie, FILTER_KEYS } from '../../../types/types'
import MovieStats from '../MovieStats/MovieStats.vue'
const { movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const totalMovies = computed(() => {
  return movies.value.length
})
const watchedMovies = computed(() => {
  return movies.value.filter((movie: Movie) => movie.watched).length
})
const unwatchedMovies = computed(() => {
  return movies.value.filter((movie: Movie) => !movie.watched).length
})
const expandedFilterKey = ref<FILTER_KEYS | null>(null)
const updateExpandedFilterKey = (filterKey: FILTER_KEYS) => {
  if (expandedFilterKey.value === filterKey) {
    expandedFilterKey.value = null
  } else {
    expandedFilterKey.value = filterKey
  }
}
</script>
<template>
    <div class="the-footer-movie-details">
        <p>Total movies: {{ totalMovies }}</p>
        <p>Watched movies: {{ watchedMovies }}</p>
        <p>Unwatched movies: {{ unwatchedMovies }}</p>
        <MovieStats
          :filterKey="FILTER_KEYS.DIRECTOR"
          :dataBuilder="buildDirectorData"
          :expanded="expandedFilterKey === FILTER_KEYS.DIRECTOR"
          @update:expanded="updateExpandedFilterKey"
        />
        <MovieStats
          :filterKey="FILTER_KEYS.COUNTRY"
          :dataBuilder="buildCountryData"
          :expanded="expandedFilterKey === FILTER_KEYS.COUNTRY"
          @update:expanded="updateExpandedFilterKey"
        />
        <MovieStats
          :filterKey="FILTER_KEYS.DECADE"
          :dataBuilder="buildDecadeData"
          :expanded="expandedFilterKey === FILTER_KEYS.DECADE"
          @update:expanded="updateExpandedFilterKey"
        />
    </div>
</template>
<style scoped>
.the-footer-movie-details {
    width: calc(50% - 7px);
    margin-right: 10px;
    border-right: 1px solid var(--border-color);
}
</style>