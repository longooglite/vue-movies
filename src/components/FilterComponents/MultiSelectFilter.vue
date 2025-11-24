<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import MultiSelectInput from '../FormComponents/MultiSelectInput.vue'
import { FILTER_KEYS, Movie } from '../../types/types'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import {
  awsMovieProviderKey,
  AwsMovieProviderReturn,
} from '../../types/providers/AwsMovieProvider'
const props = withDefaults(
  defineProps<{
    filterKey: FILTER_KEYS
    type?: 'number' | 'string'
  }>(),
  {
    type: 'string',
  },
)
const { movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const { updateActiveFilters } = inject(
  movieFilterProviderKey,
) as MovieFilterProviderReturn
const currentValue = ref<(string | number)[] | null>(null)

const options = computed(() => {
  return Array.from(
    new Set(
      movies.value
        .filter((movie: Movie) => movie[props.filterKey])
        .map((movie: Movie) => movie[props.filterKey] as string),
    ),
  )
})

const handleChange = (value: (string | number)[] | null) => {
  console.log('handleChange', value)
  if (!value?.length) {
    currentValue.value = null
    updateActiveFilters(props.filterKey, null)
  } else {
    currentValue.value = value
    updateActiveFilters(props.filterKey, value)
  }
}
</script>
<template>
  <MultiSelectInput
    :label="props.filterKey"
    :options="options"
    :defaultValue="currentValue"
    :type="props.type"
    @update:multiSelectValue="handleChange"
  />
</template>
