<script setup lang="ts">
import settings from '@/settings.ts'
import useLayoutSettingStore from '@/store/modules/layoutSettings'

const layoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="logo">
    <img :src="settings.logoImg" alt="logo" />
    <p v-if="!layoutSettingStore.isFold">{{ settings.title }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: white;
  img {
    width: $base-menu-logo-img-width;
    height: $base-menu-logo-img-height;
    margin: 0 10px;
  }
  p {
    font-size: $base-menu-logo-font-size;
  }
}
</style>
