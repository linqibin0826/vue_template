<script setup lang="ts">
import Logo from '@/layout/logo/index.vue'
import Menu from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import TabBar from '@/layout/tab_bar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/layoutSettings'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'Layout',
})
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
const $route = useRoute()

</script>

<template>
  <div class="layout_container">
    <div class="slider_container" :class="{fold: layoutSettingStore.isFold}">
      <!--左侧菜单栏Logo-->
      <Logo></Logo>
      <!--左侧菜单栏-->
      <el-scrollbar class="slider_scrollbar">
        <el-menu class="menu"
                 background-color="#001529"
                 text-color="#fff"
                 :default-active="$route.path"
                 :collapse="layoutSettingStore.isFold"
        >
          <Menu :menuRoutes="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="tab_bar_container" :class="{fold: layoutSettingStore.fold}">
      <!--顶部TabBar-->
      <TabBar></TabBar>
    </div>
    <div class="main_container" :class="{fold: layoutSettingStore.fold}">
      <!--内容显示区域-->
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables';

.layout_container {
  width: 100%;
  height: 100vh;

  .slider_container {
    width: $base-menu-width;
    height: 100%;
    background-color: $base-menu-bg-color;
    transition: all 0.3s;
    .slider_scrollbar {
      height: calc(100vh - $base-tab-bar-height);
      .menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-fold-width;
    }
  }

  .tab_bar_container {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tab-bar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-fold-width;
      width: calc(100% - $base-menu-fold-width);
    }
  }

  .main_container {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tab-bar-height);
    left: $base-menu-width;
    top: $base-tab-bar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-fold-width;
      width: calc(100% - $base-menu-fold-width);
    }

  }
}


</style>
