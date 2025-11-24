<script setup lang="ts">
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { PhList, PhFunnel } from '@phosphor-icons/vue'
import TheFilterRow from '../TheFilterRow/TheFilterRow.vue'
import { inject, type Ref } from 'vue'
const drawerStore = useDrawerStore()
const openNavigation = () => {
  drawerStore.openDrawer(DrawerIds.NAVIGATION)
}
const openMobileFilter = () => {
  drawerStore.openDrawer(DrawerIds.MOBILE_FILTER)
}
const screenSize = inject('screenSize') as Ref<string>
</script>
<template>
  <div class="the-header" :class="{ mobile: screenSize === 'mobile' }">
    <div class="header-left">
      <button @click="openNavigation"><PhList /></button>
    </div>
    <h1>Movie List</h1>
    <div class="header-right">
      <button v-if="screenSize === 'mobile'" @click="openMobileFilter"><PhFunnel /></button>
    </div>
  </div>
  <TheFilterRow v-if="screenSize === 'desktop'" />
</template>
<style scoped>
.the-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--app-bg);
  height: var(--header-height);
  padding: 0 16px;
  font-family: var(--font-mono);
}
.the-header.mobile {
  font-size: 1.5rem;
}
</style>
