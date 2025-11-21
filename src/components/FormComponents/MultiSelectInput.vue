<script setup lang='ts'>
import { type MultiSelectInputProps, type MultiSelectInputEmits } from '../../types/components/FormComponents/FormComponents'
import MultiSelectOption from './MultiSelectOption.vue'
import { computed, ref } from 'vue'

const emit = defineEmits<MultiSelectInputEmits>()
const props = defineProps<MultiSelectInputProps>()
const currentValue = ref<string[] | null>(null)

const typeCastFunction = computed<((value: string) => string | number)>(() => {
    switch (props.type) {
        case 'number':
            return (value: string) => Number(value)
        case 'string':
            return (value: string) => value
        default:
            return (value: string) => value
    }
})

const allOptions = computed(() => {
    return [...props.options.map(option => {
        return {
                label: option,
                value: option,
            }
        })
    ]
})

const processNewValue = (value: string): string[] | null => {
    if (currentValue.value === null) {
        return [value]
    }
    if (currentValue.value?.includes(value)) {
        return currentValue.value.filter(v => v !== value)
    } else {
        return [...currentValue.value, value]
    }   
}

const handleChange= (value: string) => {
    const newValues = processNewValue(value)
    if (newValues === null) {
        currentValue.value = null
        emit('update:multiSelectValue', null)
    } else {
        currentValue.value = newValues
        emit('update:multiSelectValue', currentValue.value.map(typeCastFunction.value))
    }
}
</script>
<template>
    <MultiSelectOption
        v-for="option in allOptions"
        :key="option.label"
        :label="option.label"
        :value="option.value"
        :active="currentValue?.includes(option.value) ?? false"
        @update:multiSelectOptionValue="handleChange"
    />
</template>