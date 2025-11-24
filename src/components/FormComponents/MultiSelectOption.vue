<script setup lang="ts">
import { PhPlusSquare, PhMinusSquare } from '@phosphor-icons/vue'
import {
  type MultiSelectOptionProps,
  type MultiSelectOptionEmits,
} from '../../types/components/FormComponents/FormComponents'
import { ref } from 'vue'
const emit = defineEmits<MultiSelectOptionEmits>()
const props = defineProps<MultiSelectOptionProps>()
const currentValue = ref<string>(props.label ?? props.value)

const handleChange = (value: string) => {
  currentValue.value = value
  emit('update:multiSelectOptionValue', value)
}
</script>
<template>
  <div class="multi-select-option-container">
    <span
      :class="{ active: props.active }"
      @click.stop="handleChange(props.value)"
    >
      <span>
        <PhPlusSquare v-show="!props.active" />
        <PhMinusSquare v-show="props.active" />
        {{ props.label }}
      </span>
    </span>
  </div>
</template>
<style scoped>
.multi-select-option-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
}

.multi-select-option-container > span {
  cursor: pointer;
}
</style>
