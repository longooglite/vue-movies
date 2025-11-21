<script setup lang='ts'>
import { ref } from 'vue'
import MovieListEntryTitleMenu from './MovieListEntryTitleMenu.vue'
defineProps<{
    title: string
}>()
const expand = ref(false)
const toggleExpand = () => {
    expand.value = !expand.value
}
</script>
<template>
    <div
        class="movie-list-entry-title"
        @mouseenter="toggleExpand"
        @mouseleave="toggleExpand"
    >
        <span>{{ title }}</span>
        <MovieListEntryTitleMenu :expand="expand" />
    </div>
</template>
<style scoped>
.movie-list-entry-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}
</style>