<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import useLayoutSettingStore from '@/store/modules/layoutSettings'

const layoutSettingStore = useLayoutSettingStore()
const refreshFlag = ref(true)
watch(
  () => layoutSettingStore.getRefresh,
  async () => {
    refreshFlag.value = false
    // 等待下一次 DOM 更新
    await nextTick(() => {
      // 重新渲染组件
      refreshFlag.value = true
    })
  },
)

</script>

<template>
  <div>
    <router-view v-slot=" { Component }">
      <transition name="fade">
        <!--渲染一级路由组件的子组件-->
        <component :is="Component" v-if="refreshFlag" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">

</style>
