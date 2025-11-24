<script setup lang="ts">
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { PhX } from '@phosphor-icons/vue'
const drawerStore = useDrawerStore()
const closeDrawer = () => {
  drawerStore.closeDrawer()
}
</script>
<template>
  <div class="the-drawer-header">
    <slot></slot>
    <button @click="closeDrawer"><PhX /></button>
  </div>
</template>
<style scoped>
.the-drawer-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
