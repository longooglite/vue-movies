<script setup lang="ts">
const props = defineProps<{
  expand: boolean
}>()
</script>
<template>
  <div v-show="props.expand">
    <slot></slot>
  </div>
</template>