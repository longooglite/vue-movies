<script setup lang='ts'>
import { Movie } from '../../types/types'
import EditMovieForm from '../EditMovieForm/EditMovieForm.vue'
defineProps<{
    movie: Movie
}>()
</script>
<template>
    <div class="edit-movie-drawer">
        <EditMovieForm :movie="movie" />
    </div>
</template>