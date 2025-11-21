<script setup lang='ts'>
import { inject, ref } from 'vue'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { FILTER_KEYS } from '../../types/types'
import StringInput from '../FormComponents/StringInput.vue'
const { updateActiveFilters } = inject(movieFilterProviderKey) as MovieFilterProviderReturn

const props = defineProps<{
    filterKey: FILTER_KEYS
    showLabel?: boolean
}>()
const currentValue = ref<string | null>(null)

const handleChange = (value: string | null) => {
    currentValue.value = value
    updateActiveFilters(props.filterKey, value ?? null)
}
</script>
<template>
    <StringInput
        :label="props.showLabel ? props.filterKey : ''"
        :placeholder="!props.showLabel ? props.filterKey : ''"
        v-model="currentValue"
        @update:modelValue="handleChange"
    />
</template>