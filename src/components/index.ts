// 全局组件注册
import SvgIcon from './SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App, Component } from 'vue'

const allGlobalComponents: { [name: string]: Component} = {
  SvgIcon,
}
export default {
  install(app: App) {
    // 注册Svg图标为全局组件
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
    // 注册 ElementPlus图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}
