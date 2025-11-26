<script setup lang="ts">
import { computed } from 'vue'
import { Movie } from '../../../../types/types'
import { TOP_ITEMS_COUNT } from '../../../../consts/globals'
const props = defineProps<{
  data: Movie[]
  expanded: boolean
}>()
const titles = computed(() => {
    return props.data.map((movie) => movie.title).slice(0, TOP_ITEMS_COUNT).join(', ')
})
</script>
<template>
  <div class="footer-stats-details">
    <div v-show="props.expanded">
        <span>{{ titles }}</span>
    </div>
  </div>
</template>