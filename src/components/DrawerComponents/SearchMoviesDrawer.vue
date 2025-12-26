<script setup lang="ts">
import SearchForm from '../SearchForm/SearchForm.vue'
import MovieList from '../MovieList/MovieList.vue'
import { ref } from 'vue'
import { Movie } from '../../types/types'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { useCreateMovieStore } from '../../stores/createMovieStore/createMovieStore'

const drawerStore = useDrawerStore()
const createMovieStore = useCreateMovieStore()
const searchResults = ref<Omit<Movie, 'id'>[]>([])
const updateSearchResults = (results: Omit<Movie, 'id'>[]) => {
  searchResults.value = results
}
const clickCallback = (movie: Movie) => {
  createMovieStore.setMovie(movie)
  drawerStore.openDrawer(DrawerIds.CREATE_MOVIE)
}
</script>
<template>
  <div class="search-movies-drawer">
    <SearchForm @update:searchResults="updateSearchResults" />
    <MovieList
      :movies="searchResults"
      :loading="false"
      :singleColumn="true"
      :clickCallbacks="{editMovie: clickCallback}"
    />
  </div>
</template>
<style scoped>
.search-movies-drawer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
