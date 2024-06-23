<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
})
defineProps(['menuRoutes'])
const $router = useRouter()
const handleClick = (e: any) => {
  $router.push(e.index)
}
</script>

<template>
  <template v-for="route in menuRoutes" :key="route.path">
    <template v-if="route.meta.hidden !== true">
      <el-menu-item :index="route.path"
                    v-if="route.children == null"
                    @click="handleClick">
        <el-icon>
          <component :is="route.meta.icon"></component>
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
      <el-menu-item :index="route.children[0].path"
                    v-else-if="route.children.length === 1"
                    @click="handleClick">
        <el-icon>
          <component :is="route.children[0].meta.icon"></component>
        </el-icon>
        <span>{{ route.children[0].meta.title }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="route.path">
        <template #title>
          <el-icon>
            <component :is="route.meta.icon"></component>
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <Menu :menuRoutes="route.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<style scoped lang="scss">

</style>
