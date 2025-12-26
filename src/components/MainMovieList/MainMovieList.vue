<script setup lang="ts">
import { inject } from 'vue'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { awsMovieProviderKey } from '../../types/providers/AwsMovieProvider'
import { AwsMovieProviderReturn } from '../../types/providers/AwsMovieProvider'
import MovieList from '../MovieList/MovieList.vue'
import { useEditMovieStore } from '../../stores/editMovieStore/editMovieStore'
import { Movie } from '../../types/types'
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { screenSizeProviderKey, ScreenSize } from '../../types/providers/ScreenSizeProvider'
import { useMovieDetailsStore } from '../../stores/movieDetailsStore/movieDetailsStore'

const drawerStore = useDrawerStore()
const movieDetailsStore = useMovieDetailsStore()
const { filteredMovies } = inject(
  movieFilterProviderKey,
) as MovieFilterProviderReturn
const { loading } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const editMovieStore = useEditMovieStore()
const editMovieClickCallback = (movie: Movie) => {
  editMovieStore.setMovie(movie)
  drawerStore.openDrawer(DrawerIds.EDIT_MOVIE)
}
const movieDetailsClickCallback = (movie: Movie) => {
  movieDetailsStore.setMovie(movie)
  drawerStore.openDrawer(DrawerIds.MOVIE_DETAILS)
}
const screenSize = inject(screenSizeProviderKey)
</script>

<template>
  <MovieList
    :movies="filteredMovies"
    :loading="loading"
    :clickCallbacks="{
      editMovie: editMovieClickCallback,
      movieDetails: movieDetailsClickCallback,
    }"
    :singleColumn="screenSize === ScreenSize.MOBILE"
  />
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
