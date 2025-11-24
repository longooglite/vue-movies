<script setup lang="ts">
import { PhRadioButton } from '@phosphor-icons/vue'
import {
  TriStateBooleanEmits,
  TriStateBooleanProps,
  TriStateBooleanValues,
} from '../../types/components/FormComponents/FormComponents'

const emit = defineEmits<TriStateBooleanEmits>()
const props = defineProps<TriStateBooleanProps>()
const model = defineModel()
const updateBooleanValue = (newValue: TriStateBooleanValues) => {
  model.value = newValue
  emit('update:triStateValue', newValue)
}
</script>
<template>
  <div className="tri-state-boolean-options">
    <span
      :class="{ active: model === TriStateBooleanValues.TRUE }"
      @click="updateBooleanValue(TriStateBooleanValues.TRUE)"
    >
      <PhRadioButton
        :weight="model === TriStateBooleanValues.TRUE ? 'fill' : 'regular'"
      />
      <span>{{ props.labels?.true ?? 'True' }}</span>
    </span>
    <span
      :class="{ active: model === TriStateBooleanValues.FALSE }"
      @click="updateBooleanValue(TriStateBooleanValues.FALSE)"
    >
      <PhRadioButton
        :weight="model === TriStateBooleanValues.FALSE ? 'fill' : 'regular'"
      />
      <span>{{ props.labels?.false ?? 'False' }}</span>
    </span>
    <span
      :class="{ active: model === TriStateBooleanValues.NULL }"
      @click="updateBooleanValue(TriStateBooleanValues.NULL)"
    >
      <PhRadioButton
        :weight="model === TriStateBooleanValues.NULL ? 'fill' : 'regular'"
      />
      <span>{{ props.labels?.null ?? 'Null' }}</span>
    </span>
  </div>
</template>
<style scoped>
.tri-state-boolean-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.tri-state-boolean-options > span {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}
</style>
