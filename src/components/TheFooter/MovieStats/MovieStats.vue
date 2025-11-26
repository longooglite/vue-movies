<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { awsMovieProviderKey } from '../../../types/providers/AwsMovieProvider'
import { AwsMovieProviderReturn } from '../../../types/providers/AwsMovieProvider'
import { FILTER_KEYS, Movie, CountryData, DecadeData, GenreData, FormatData, WatchedData, DirectorData } from '../../../types/types'
import { TOP_ITEMS_COUNT } from '../../../consts/globals'
import MovieStatsDetails from './MovieStatsDetails/MovieStatsDetails.vue'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
const emit = defineEmits(['update:expanded'])
const props = defineProps<{
  filterKey: FILTER_KEYS
  expanded: boolean
  dataBuilder: (movies: Movie[]) => CountryData[] | DecadeData[] | GenreData[] | FormatData[] | WatchedData[] | DirectorData[]
}>()
const expandedIndex = ref(-1)
const { movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const data = computed(() => props.dataBuilder(movies.value))
const topData = computed(() => data.value.slice(0, TOP_ITEMS_COUNT))

</script>
<template>
  <div class="movie-stats">
    <button 
        class="movie-stats-button"     
        @click="emit('update:expanded', props.filterKey)"
    >
        {{ props.filterKey }}
    </button>
    <div class="movie-stats-content" v-show="props.expanded">
      <div 
        class="movie-stats-content-item"
        v-for="(item, index) in topData"
        :key="item[props.filterKey]"
        :index="index"
       >
        <div class="movie-stats-content-item-label">
            <span>{{ item[props.filterKey] }}</span>
            <span>{{ item.movies.length }}</span>
            <button @click="expandedIndex === index ? expandedIndex = -1 : expandedIndex = index">
                <PhCaretDown v-show="expandedIndex !== index" />
                <PhCaretUp v-show="expandedIndex === index" />
            </button>
        </div>
        <MovieStatsDetails :data="item.movies" :expanded="expandedIndex === index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-stats {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.movie-stats-button {
    margin-right: 10px;
    text-transform: capitalize;
    border-bottom: 1px solid var(--border-color);
    padding: 5px 10px;
}
.movie-stats-content-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.movie-stats-content-item-label {
  display: flex;
  flex-direction: row;
}
.movie-stats-content-item-label span {
  margin-right: 10px;
}
</style>