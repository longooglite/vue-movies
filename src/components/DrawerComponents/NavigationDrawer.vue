<script setup lang="ts">
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
const drawerStore = useDrawerStore()
const openDrawer = (drawerId: DrawerIds) => {
  drawerStore.openDrawer(drawerId)
}
</script>
<template>
  <div class="navigation-drawer">
    <button @click="openDrawer(DrawerIds.SEARCH_MOVIES)">Add Movie</button>
  </div>
</template>
<style scoped>
.navigation-drawer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.navigation-drawer button {
  width: 100%;
  cursor: pointer;
}
.navigation-drawer button:hover {
  text-decoration: underline;
}
</style>
