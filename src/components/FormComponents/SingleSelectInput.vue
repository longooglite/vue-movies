<script setup lang="ts">
import SingleSelectOption from './SingleSelectOption.vue'
import {
  SingleSelectInputProps,
  SingleSelectInputEmits,
} from '../../types/components/FormComponents/FormComponents'
import { computed, ref } from 'vue'
const emit = defineEmits<SingleSelectInputEmits>()
const props = defineProps<SingleSelectInputProps>()
const currentValue = ref<string | null>(null)

const allOptions = computed(() => {
  return [
    ...props.options.map((option) => {
      return {
        label: option,
        value: option,
      }
    }),
  ]
})

const handleChange = (value: string) => {
  if (currentValue.value === value) {
    currentValue.value = null
    emit('update:singleSelectValue', null)
  } else {
    currentValue.value = value
    emit('update:singleSelectValue', currentValue.value)
  }
}
</script>
<template>
  <SingleSelectOption
    v-for="option in allOptions"
    :key="option.label"
    :label="option.label"
    :value="option.value"
    :active="currentValue === option.value"
    @update:singleSelectOptionValue="handleChange"
  />
</template>
