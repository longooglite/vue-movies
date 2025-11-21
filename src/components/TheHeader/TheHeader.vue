<script setup lang='ts'>
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import { PhList } from '@phosphor-icons/vue'

const drawerStore = useDrawerStore()
const openNavigation = () => {
    drawerStore.openDrawer(DrawerIds.NAVIGATION)
}
</script>
<template>
    <div class="the-header">
        <div class="header-left">
            <button @click="openNavigation"><PhList /></button>
        </div>
        <h1>Movie List</h1>
        <div class="header-right"></div>
    </div>
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
</style>