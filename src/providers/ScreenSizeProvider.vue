<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'

const screenSize = ref('mobile')

const handleResize = () => {
  screenSize.value = window.innerWidth > 768 ? 'desktop' : 'mobile'
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

provide('screenSize', screenSize)
</script>
<template><slot></slot></template>
