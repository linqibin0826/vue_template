// 布局相关的状态管理
import { defineStore } from 'pinia'

export default defineStore('layoutSettings', {
  state: () => {
    return {
      // 侧边栏是否折叠
      fold: false,
      // 刷新按钮
      refresh: false,
    }
  },
  actions: {
    // 切换侧边栏折叠状态
    toggleSidebar() {
      this.fold = !this.fold
    },
    toggleRefresh() {
      this.refresh = !this.refresh
    }
  },
  getters: {
    isFold(): boolean {
      return this.fold
    },
    getRefresh(): boolean {
      return this.refresh
    }
  },
})
