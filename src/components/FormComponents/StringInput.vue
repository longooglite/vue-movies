<script setup lang="ts">
import {
  StringInputEmits,
  StringInputProps,
} from '../../types/components/FormComponents/FormComponents'
defineEmits<StringInputEmits>()
const props = defineProps<StringInputProps>()
const model = defineModel()
const updateStringValue = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}
</script>
<template>
  <div className="string-input-container">
    <label>
      <span class="string-input-label" v-if="props.label">{{ props.label }}</span>
      <input
        type="text"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :value="model"
        @change="updateStringValue"
      />
    </label>
  </div>
</template>
<style scoped>
.string-input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.string-input-container > label {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.string-input-container input {
  background: transparent;
  outline: none;
  border: none;
  border-bottom: solid #ccc 1px;
  line-height: 1.15rem;
  font-size: 1.15rem;
}
.string-input-container input::placeholder {
  text-transform: capitalize;
}
</style>
