<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { MOBILE_BREAKPOINT } from '../consts/globals'
import { ScreenSize, screenSizeProviderKey } from '../types/providers/ScreenSizeProvider'

const screenSize = ref(ScreenSize.MOBILE)

const setScreenSize = (innerWidth: number) => {
  screenSize.value = innerWidth > MOBILE_BREAKPOINT ? ScreenSize.DESKTOP : ScreenSize.MOBILE
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

provide(screenSizeProviderKey, screenSize)
</script>
<template><slot></slot></template>
