<script setup lang="ts">
import { FILTER_KEYS } from '../../types/types'
import StringFilter from '../FilterComponents/StringFilter.vue'
import MultiSelectFilter from '../FilterComponents/MultiSelectFilter.vue'
import BooleanFilter from '../FilterComponents/BooleanFilter.vue'
import { movieFilterProviderKey } from '../../types/providers/MovieFilterProvider'
import { type MovieFilterProviderReturn } from '../../types/providers/MovieFilterProvider'
import { computed, inject, ref } from 'vue'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import ExpandableContent from '../ExpandableContent/ExpandableContent.vue'

const filterProvider = inject(movieFilterProviderKey) as MovieFilterProviderReturn
const filters = computed(() => filterProvider.filters.value)

const countryExpanded = ref(false)
const decadeExpanded = ref(false)
const genreExpanded = ref(false)
const formatExpanded = ref(false)
const watchedExpanded = ref(false)

const countryValues = computed(() => {
  return filters.value.find(filter => filter.key === FILTER_KEYS.COUNTRY)?.value
})
const decadeValues = computed(() => {
  return filters.value.find(filter => filter.key === FILTER_KEYS.DECADE)?.value
})
const genreValues = computed(() => {
  return filters.value.find(filter => filter.key === FILTER_KEYS.GENRE)?.value
})
const formatValues = computed(() => {
  return filters.value.find(filter => filter.key === FILTER_KEYS.FORMAT)?.value
})
const watchedValues = computed(() => {
  return filters.value.find(filter => filter.key === FILTER_KEYS.WATCHED)?.value
})
</script>
<template>
  <div class="mobile-filter-drawer">
    <StringFilter :filterKey="FILTER_KEYS.TITLE" />
    <StringFilter :filterKey="FILTER_KEYS.DIRECTOR" />
    <div class="mobile-filter-drawer-expandable-content" @click="countryExpanded = !countryExpanded">
      <span class="mobile-filter-drawer-expandable-content-label">
        Country
        <PhCaretDown v-show="!countryExpanded" />
        <PhCaretUp v-show="countryExpanded" />
      </span>
      <div
        class="mobile-filter-drawer-expandable-content-values"
        v-if="!countryExpanded"
        v-for="country in countryValues"
        :key="country"
      >
        <span>{{ country }}</span>
      </div>
      <ExpandableContent :expand="countryExpanded">
        <MultiSelectFilter :filterKey="FILTER_KEYS.COUNTRY" />
      </ExpandableContent>
    </div>
    <div class="mobile-filter-drawer-expandable-content" @click="decadeExpanded = !decadeExpanded">
      <span class="mobile-filter-drawer-expandable-content-label">
        Decade
        <PhCaretDown v-show="!decadeExpanded" />
        <PhCaretUp v-show="decadeExpanded" />
      </span>
      <div 
        class="mobile-filter-drawer-expandable-content-values"
        v-if="!decadeExpanded"
        v-for="decade in decadeValues"
        :key="decade"
      >
        <span>{{ decade }}</span>
      </div>
      <ExpandableContent :expand="decadeExpanded">
        <MultiSelectFilter :filterKey="FILTER_KEYS.DECADE" />
      </ExpandableContent>
    </div>
    <div class="mobile-filter-drawer-expandable-content" @click="genreExpanded = !genreExpanded">
      <span class="mobile-filter-drawer-expandable-content-label">
        Genre
        <PhCaretDown v-show="!genreExpanded" />
        <PhCaretUp v-show="genreExpanded" />
      </span>
      <div 
        class="mobile-filter-drawer-expandable-content-values"
        v-if="!genreExpanded"
        v-for="genre in genreValues"
        :key="genre"
      >
        <span>{{ genre }}</span>
      </div>
      <ExpandableContent :expand="genreExpanded">
        <MultiSelectFilter :filterKey="FILTER_KEYS.GENRE" />
      </ExpandableContent>
    </div>
    <div class="mobile-filter-drawer-expandable-content" @click="formatExpanded = !formatExpanded">
      <span class="mobile-filter-drawer-expandable-content-label">
        Format
        <PhCaretDown v-show="!formatExpanded" />
        <PhCaretUp v-show="formatExpanded" />
      </span>
      <div 
        class="mobile-filter-drawer-expandable-content-values"
        v-if="!formatExpanded"
        v-for="format in formatValues"
        :key="format"
      >
        <span>{{ format }}</span>
      </div>
      <ExpandableContent :expand="formatExpanded">
        <MultiSelectFilter :filterKey="FILTER_KEYS.FORMAT" />
      </ExpandableContent>
    </div>
    <div class="mobile-filter-drawer-expandable-content" @click="watchedExpanded = !watchedExpanded">
      <span class="mobile-filter-drawer-expandable-content-label">
        Watched
        <PhCaretDown v-show="!watchedExpanded" />
        <PhCaretUp v-show="watchedExpanded" />
      </span>
      <div 
        class="mobile-filter-drawer-expandable-content-values"
        v-if="!watchedExpanded"
      >
        <span v-if="!watchedValues && watchedValues !== null">Not watched</span>
        <span v-if="watchedValues">Watched</span>
      </div>
      <ExpandableContent :expand="watchedExpanded">
        <BooleanFilter :filterKey="FILTER_KEYS.WATCHED" />
      </ExpandableContent>
    </div>
  </div>
</template>
<style scoped>
.mobile-filter-drawer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mobile-filter-drawer-expandable-content {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.mobile-filter-drawer-expandable-content-values {
  font-size: 0.8rem;
}
</style>