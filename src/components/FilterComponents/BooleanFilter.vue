<script setup lang="ts">
import TriStateBoolean from '../FormComponents/TriStateBoolean.vue'
import { inject, ref } from 'vue'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { FILTER_KEYS } from '../../types/types'
import { TriStateBooleanValues } from '../../types/components/FormComponents/FormComponents'
import { triStateBooleanValueToBoolean as triValue } from '../../utils/transformers/triStateBooleanValueToBoolean'
const { updateActiveFilters } = inject(
  movieFilterProviderKey,
) as MovieFilterProviderReturn

const props = defineProps<{
  filterKey: FILTER_KEYS
  showLabel?: boolean
}>()

const currentValue = ref<TriStateBooleanValues>(TriStateBooleanValues.NULL)

const handleChange = (value: TriStateBooleanValues) => {
  const newValue = triValue(value)
  updateActiveFilters(props.filterKey, newValue)
}
</script>
<template>
  {{ props.showLabel ? props.filterKey : '' }}
  <TriStateBoolean
    v-model="currentValue"
    @update:triStateValue="handleChange"
  />
</template>
