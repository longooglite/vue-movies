<script setup lang="ts">
import { ref} from 'vue'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'
import TheFooterMovieDetails from './TheFooterMovieDetails/TheFooterMovieDetails.vue'
import TheFooterSiteDetails from './TheFooterSiteDetails/TheFooterSiteDetails.vue'
const footerExpanded = ref(false)
const toggleFooterExpanded = () => {
  footerExpanded.value = !footerExpanded.value
}
</script>

<template>
  <footer class="the-footer" :class="{ expanded: footerExpanded }">
    <button @click="toggleFooterExpanded">
      <PhCaretUp v-show="!footerExpanded" />
      <PhCaretDown v-show="footerExpanded" />
    </button>
    <div class="the-footer-content">
      <TheFooterMovieDetails />
      <TheFooterSiteDetails />
    </div>
  </footer>
</template>

<style scoped>
.the-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: var(--app-bg);
  height: var(--footer-height);
  transition: height 0.1s ease-in-out;
  padding: 10px;
  border-top: 1px solid var(--border-color);
  overflow-x: hidden;
}
.the-footer-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between; 
}
.the-footer.expanded {
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
}
</style>