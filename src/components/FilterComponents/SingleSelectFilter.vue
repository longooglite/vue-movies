<script setup lang='ts'>
import { computed, inject, ref } from 'vue'
import SingleSelectInput from '../FormComponents/SingleSelectInput.vue'
import { FILTER_KEYS, Movie } from '../../types/types'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { awsMovieProviderKey, AwsMovieProviderReturn } from '../../types/providers/AwsMovieProvider'
const props = defineProps<{
    filterKey: FILTER_KEYS
}>()
const { movies } = inject(awsMovieProviderKey) as AwsMovieProviderReturn
const { updateActiveFilters } = inject(movieFilterProviderKey) as MovieFilterProviderReturn
const currentValue = ref<string | null>(null)

const options = computed(() => {
    return Array.from(new Set(movies.value.filter((movie: Movie) => movie[props.filterKey]).map((movie: Movie) => movie[props.filterKey] as string)))
})

const handleChange = (value: string | null) => {
    currentValue.value = value
    updateActiveFilters(props.filterKey, value)
}
</script>
<template>
    <SingleSelectInput
        :label="props.filterKey"
        :options="options"
        :defaultValue="currentValue"
        @update:singleSelectValue="handleChange"
    />
</template>