import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import globalComponents from '@/components/index'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import pinia from '@/store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件，注册全局组件
app.use(globalComponents)
app.use(router)
app.use(pinia)

app.mount('#app')
