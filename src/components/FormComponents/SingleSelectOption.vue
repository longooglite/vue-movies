<script setup lang='ts'>
import { PhPlusSquare, PhMinusSquare } from '@phosphor-icons/vue'
import { type SingleSelectOptionProps, type SingleSelectOptionEmits } from '../../types/components/FormComponents/FormComponents'
import { ref } from 'vue'
const emit = defineEmits<SingleSelectOptionEmits>()
const props = defineProps<SingleSelectOptionProps>()
const currentValue = ref<string>(props.label ?? props.value)

const handleChange = (value: string) => {
    currentValue.value = value
    emit('update:singleSelectOptionValue', currentValue.value)
}
</script>
<template>
    <div class="single-select-option-container">
        <span 
            :class="{ 'active': props.active }"
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
.single-select-option-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.single-select-option-container>span {
    cursor: pointer;
}
</style>