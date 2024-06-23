<script setup lang="ts">
import BreadCrumb from '@/layout/tab_bar/breadcrumb/index.vue'
import Setting from '@/layout/tab_bar/setting/index.vue'

defineOptions({
  name: 'TabBar',
})
</script>

<template>
  <div class="tab_bar">
    <!--左侧面包屑-->
    <div class="left_bar">
      <BreadCrumb></BreadCrumb>
    </div>
    <!--右侧设置区域-->
    <div class="right_bar">
      <Setting></Setting>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab_bar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .left_bar {
    display: flex;
    align-items: center;
  }

  .right_bar {
    display: flex;
    align-items: center;
  }
}
</style>
