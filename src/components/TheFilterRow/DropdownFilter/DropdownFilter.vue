<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import {
  movieFilterProviderKey,
  MovieFilterProviderReturn,
} from '../../../types/providers/MovieFilterProvider'
import { FILTER_KEYS } from '../../../types/types'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
const props = defineProps<{
  filterKey: FILTER_KEYS
}>()
const filterProvider = inject(
  movieFilterProviderKey,
) as MovieFilterProviderReturn
const currentFilterValue = computed(() => {
  const rawValue = filterProvider.filters.value.find(
    (filter) => filter.key === props.filterKey,
  )?.value
  if (Array.isArray(rawValue)) {
    return rawValue.join(', ')
  }
  return rawValue ?? ''
})
const open = ref(false)
const toggleOpen = () => {
  open.value = !open.value
}
</script>
<template>
  <div class="dropdown-filter" @click="toggleOpen">
    <span class="dropdown-filter-label">{{ props.filterKey }}</span>
    <span v-show="!open" class="dropdown-filter-value">{{
      currentFilterValue.toString()
    }}</span>
    <button>
      <PhCaretDown v-show="!open" />
      <PhCaretUp v-show="open" />
    </button>
    <div class="dropdown-filter-content" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.dropdown-filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  width: 100%;
}
.dropdown-filter button {
  margin: 0 10px;
}
.dropdown-filter-label {
  font-size: 1.15rem;
  text-transform: capitalize;
}
.dropdown-filter-value {
  font-size: 0.8rem;
  position: absolute;
  top: 100%;
  text-transform: capitalize;
}
.dropdown-filter-content {
  position: absolute;
  top: calc(100% + 17px);
  left: 0;
  width: calc(100% - 15px);
  background: var(--app-bg);
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  padding: 5px;
  border-bottom: solid 1px #ccc;
  border-right: solid 1px #ccc;
  border-left: solid 1px #ccc;
}
</style>
