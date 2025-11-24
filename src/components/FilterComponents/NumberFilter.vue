<script setup lang="ts">
import NumberInput from '../FormComponents/NumberInput.vue'
import { inject, ref } from 'vue'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { FILTER_KEYS } from '../../types/types'
const { updateActiveFilters } = inject(
  movieFilterProviderKey,
) as MovieFilterProviderReturn

const props = defineProps<{
  filterKey: FILTER_KEYS
  showLabel?: boolean
}>()
const currentValue = ref<number | null>(null)

const handleChange = (value: number | null) => {
  currentValue.value = value
  updateActiveFilters(props.filterKey, value ?? null)
}
</script>
<template>
  {{ props.showLabel ? props.filterKey : '' }}
  <NumberInput
    :label="props.showLabel ? props.filterKey : ''"
    :placeholder="!props.showLabel ? props.filterKey : ''"
    v-model="currentValue"
    @update:modelValue="handleChange"
  />
</template>
