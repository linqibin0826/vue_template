<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
onMounted(() => {
  userStore.fetchUserInfo()
})
</script>

<template>
  <div>
    <h1>这是HOME</h1>
  </div>
</template>

<style scoped>

</style>
