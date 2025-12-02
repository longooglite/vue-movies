<script setup lang="ts">
import { useDrawerStore } from '../../stores/drawerStore/drawerStore'
import { DrawerIds } from '../../types/providers/DrawerProvider'
import EditMovieDrawer from '../DrawerComponents/EditMovieDrawer.vue'
import CreateMovieDrawer from '../DrawerComponents/CreateMovieDrawer.vue'
import { useEditMovieStore } from '../../stores/editMovieStore/editMovieStore'
import { computed, inject, type Ref } from 'vue'
import { DrawerTitles } from '../../types/components/TheDrawer'
import TheDrawerHeader from './TheDrawerHeader.vue'
import SearchMoviesDrawer from '../DrawerComponents/SearchMoviesDrawer.vue'
import NavigationDrawer from '../DrawerComponents/NavigationDrawer.vue'
import MobileFilterDrawer from '../DrawerComponents/MobileFilterDrawer.vue'
import { screenSizeProviderKey } from '../../types/providers/ScreenSizeProvider'

const drawerStore = useDrawerStore()
const editMovieStore = useEditMovieStore()
const drawerTitle = computed(() => {
  switch (drawerStore.currentDrawerId) {
    case DrawerIds.EDIT_MOVIE:
      return DrawerTitles.EDIT_MOVIE
    case DrawerIds.CREATE_MOVIE:
      return DrawerTitles.CREATE_MOVIE
    case DrawerIds.SEARCH_MOVIES:
      return DrawerTitles.SEARCH_MOVIES
    case DrawerIds.NAVIGATION:
      return DrawerTitles.NAVIGATION
    case DrawerIds.MOBILE_FILTER:
      return DrawerTitles.MOBILE_FILTER
    default:
      return ''
  }
})
const screenSize = inject(screenSizeProviderKey) as Ref<string>
</script>
<template>
  <Teleport to="body">
    <div
      class="the-drawer" 
      :class="{ mobile: screenSize === 'mobile' }"
      v-show="drawerStore.drawerOpen"
    >
      <TheDrawerHeader>
        <span>{{ drawerTitle }}</span>
      </TheDrawerHeader>
      <div class="the-drawer-content" v-if="drawerStore.drawerOpen">
        <EditMovieDrawer
          v-if="
            drawerStore.currentDrawerId === DrawerIds.EDIT_MOVIE &&
            drawerStore.drawerOpen
          "
          :movie="editMovieStore.movie"
        />
        <CreateMovieDrawer
          v-if="
            drawerStore.currentDrawerId === DrawerIds.CREATE_MOVIE &&
            drawerStore.drawerOpen
          "
        />
        <SearchMoviesDrawer
          v-if="
            drawerStore.currentDrawerId === DrawerIds.SEARCH_MOVIES &&
            drawerStore.drawerOpen
          "
        />
        <NavigationDrawer
          v-if="
            drawerStore.currentDrawerId === DrawerIds.NAVIGATION &&
            drawerStore.drawerOpen
          "
        />
        <MobileFilterDrawer
          v-if="
            drawerStore.currentDrawerId === DrawerIds.MOBILE_FILTER &&
            drawerStore.drawerOpen
          "
        />
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.the-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 30%;
  height: 100vh;
  background-color: var(--app-bg);
  border-right: 1px solid var(--border-color);
  z-index: 1000;
  padding: 10px;
}
.the-drawer.mobile {
  width: calc(100% - 20px);
}
.the-drawer-content {
  height: 90%;
  overflow-y: auto;
}
</style>
