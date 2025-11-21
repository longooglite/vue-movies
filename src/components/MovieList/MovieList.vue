<script setup lang="ts">

import MovieListEntry from './ MovieListEntry/MovieListEntry.vue'
import { Movie } from '../../types/types'
import { provide } from 'vue'

const props = defineProps<{
    movies: Movie[] | Omit<Movie, 'id'>[],
	loading: boolean
	clickCallback?: (movie: Movie) => void,
	singleColumn?: boolean
}>()

provide('movie-list-entry-click-callback', props.clickCallback)
provide('movie-list-single-column', props.singleColumn)
</script>

<template>
	<div class="movie-list">
		<div v-if="loading">
			<h1>Loading...</h1>
		</div>
		<MovieListEntry
			v-for="movie in movies"
			:movie="movie"
			:key="String(movie.id) + '-' + String(movie.title) + '-' + String(movie.year)"
		/>
	</div>
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