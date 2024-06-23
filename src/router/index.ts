import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from '@/router/router.ts'

export default createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
