<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layoutSettings'
import { useRoute } from 'vue-router'

const $route = useRoute()
defineOptions({
  name: 'Breadcrumb',
})

// 切换菜单栏展开和折叠效果
const layoutSettingStore = useLayoutSettingStore()
const changeIcon = () => {
  layoutSettingStore.toggleSidebar()
}
</script>

<template>
  <div class="breadcrumb">
    <!--菜单栏收缩按钮-->
    <el-icon style="margin: 10px;" @click="changeIcon">
      <component :is="layoutSettingStore.isFold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!--面包屑导航-->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in $route.matched"
                          :to="{ path: item.path }"
                          :key="index"
                          v-show="item.meta.title"
      >
        <!--vertical-align: top 使图标与文字对其-->
        <el-icon v-if="item.meta.icon" style="vertical-align: top; margin-right: 3px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span v-if="item.meta.title">{{ item.meta.title }}</span>
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
}
</style>
