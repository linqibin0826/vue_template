<script setup lang="ts">
import { ArrowDown, Plus } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/layoutSettings'

defineOptions({
  name: 'Setting',
})
const layoutSettingStore = useLayoutSettingStore()
// 切换全屏
const handleFullScreen = () => {
  const el = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    el.requestFullscreen()
  }
}
</script>

<template>
  <div class="settings">
    <el-button icon="Refresh" circle @click="layoutSettingStore.toggleRefresh"></el-button>
    <el-button icon="FullScreen" circle @click="handleFullScreen"></el-button>
    <el-button icon="Setting" circle></el-button>
    <img src="/public/logo.png" alt="avatar">
    <el-dropdown>
        <span class="el-dropdown-link">
          Admin
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Plus">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.settings {
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 10px 0 20px;
  }
}

</style>
