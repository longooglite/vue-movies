<script setup lang="ts">
import StringInput from '../FormComponents/StringInput.vue'
import { inject, ref } from 'vue'
import { tmdbSearchProviderKey } from '../../types/providers/TMDBSearchProvider'
import { TMDBSearchProviderReturn } from '../../types/providers/TMDBSearchProvider'
import { Movie } from '../../types/types'

const emit = defineEmits<{
  (e: 'update:searchResults', results: Omit<Movie, 'id'>[]): void
}>()
const tmdbSearchProvider = inject(
  tmdbSearchProviderKey,
) as TMDBSearchProviderReturn
const search = tmdbSearchProvider.search
const searchQuery = ref('')

const onSearch = async (): Promise<void> => {
  const results = await search(searchQuery.value)
  emit('update:searchResults', results)
}
</script>
<template>
  <StringInput
    label="Search"
    v-model="searchQuery"
    @update:modelValue="onSearch"
  />
</template>
<style scoped>
.search-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
