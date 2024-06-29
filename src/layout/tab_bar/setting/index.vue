<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import useLayoutSettingStore from '@/store/modules/layoutSettings'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'Setting',
})
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
// 切换全屏
const handleFullScreen = () => {
  const el = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    el.requestFullscreen()
  }
}

// 退出登录
const handleLogout = async () => {
  await userStore.userLogout()
  await $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<template>
  <div class="settings">
    <el-button icon="Refresh" circle @click="layoutSettingStore.toggleRefresh"></el-button>
    <el-button icon="FullScreen" circle @click="handleFullScreen"></el-button>
    <el-button icon="Setting" circle></el-button>
    <img :src="userStore.getUserInfo.avatar" alt="avatar">
    <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.getUserInfo.username }}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
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
