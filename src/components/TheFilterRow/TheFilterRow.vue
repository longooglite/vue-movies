<script setup lang="ts">
import StringFilter from '../FilterComponents/StringFilter.vue'
import { FILTER_KEYS } from '../../types/types'
import DropdownFilter from './DropdownFilter/DropdownFilter.vue'
import MultiSelectFilter from '../FilterComponents/MultiSelectFilter.vue'
import BooleanFilter from '../FilterComponents/BooleanFilter.vue'
</script>
<template>
  <div class="the-filter-row">
    <div class="filter-row-item">
      <StringFilter :filterKey="FILTER_KEYS.TITLE" :showLabel="false" />
    </div>
    <div class="filter-row-item">
      <StringFilter :filterKey="FILTER_KEYS.DIRECTOR" :showLabel="false" />
    </div>
    <div class="filter-row-item">
      <DropdownFilter :filterKey="FILTER_KEYS.DECADE">
        <MultiSelectFilter :filterKey="FILTER_KEYS.DECADE" />
      </DropdownFilter>
    </div>
    <div class="filter-row-item">
      <DropdownFilter :filterKey="FILTER_KEYS.COUNTRY">
        <MultiSelectFilter :filterKey="FILTER_KEYS.COUNTRY" />
      </DropdownFilter>
    </div>
    <div class="filter-row-item">
      <DropdownFilter :filterKey="FILTER_KEYS.GENRE">
        <MultiSelectFilter :filterKey="FILTER_KEYS.GENRE" />
      </DropdownFilter>
    </div>
    <div class="filter-row-item">
      <DropdownFilter :filterKey="FILTER_KEYS.WATCHED">
        <BooleanFilter :filterKey="FILTER_KEYS.WATCHED" :showLabel="false" />
      </DropdownFilter>
    </div>
  </div>
</template>
<style scoped>
.the-filter-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: var(--header-height);
  z-index: 90;
  background: var(--app-bg);
  height: var(--filter-row-height);
  width: 100%;
  border-bottom: 1px solid var(--border-color);
}
.filter-row-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: calc(100% / 6);
}
</style>
