<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { MOBILE_BREAKPOINT } from '../consts/globals'

const screenSize = ref('mobile')

const setScreenSize = (innerWidth: number) => {
  screenSize.value = innerWidth > MOBILE_BREAKPOINT ? 'desktop' : 'mobile'
}

const handleResize = () => {
  setScreenSize(window.innerWidth)
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

onMounted(() => {
  setScreenSize(window.innerWidth)
  window.addEventListener('resize', handleResize)
})

provide('screenSize', screenSize)
</script>
<template><slot></slot></template>
