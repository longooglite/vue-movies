<script setup lang="ts">
import CreateMovieForm from '../CreateMovieForm/CreateMovieForm.vue'
import { useCreateMovieStore } from '../../stores/createMovieStore/createMovieStore'

const createMovieStore = useCreateMovieStore()
</script>
<template>
  <div class="create-movie-drawer">
    <CreateMovieForm :movie="createMovieStore.movie" />
  </div>
</template>
