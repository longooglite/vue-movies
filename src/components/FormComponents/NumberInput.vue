<script setup lang="ts">
import {
  NumberInputEmits,
  NumberInputProps,
} from '../../types/components/FormComponents/FormComponents'
defineEmits<NumberInputEmits>()
const props = defineProps<NumberInputProps>()
const model = defineModel()
const updateNumberValue = (event: Event) => {
  model.value = Number((event.target as HTMLInputElement).value) ?? null
}
</script>
<template>
  <div className="number-input-container">
    <label>
      {{ props.label }}
      <input
        type="number"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :placeholder="props.placeholder"
        :value="model"
        @change="updateNumberValue"
      />
    </label>
  </div>
</template>
<style scoped>
.number-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.number-input-container input::placeholder {
  text-transform: capitalize;
}
.number-input-container input {
  background: transparent;
  outline: none;
  border: none;
  border-bottom: solid var(--border-color) 1px;
  line-height: 1.15rem;
  font-size: 1.15rem;
}
.number-input-container > label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
