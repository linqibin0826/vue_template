<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: '#icon-',
  },
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <div>
    <!--SVG图标组件化-->
    <svg :style="{ width, height}">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<style scoped>

</style>
