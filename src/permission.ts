import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'

const userStore = useUserStore(pinia)
NProgress.configure({ showSpinner: false })
//路由前置守卫
router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // 标题栏名称
  document.title = to.meta.title as string
  const requiresAuth = to.meta.requiresAuth !== false
  const token = userStore.getToken
  const userInfo = userStore.getUserInfo
  if (requiresAuth) {
    if (token && userInfo.username) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else if (token && !userInfo.username) {
      try {
        await userStore.fetchUserInfo()
        //放行
        //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
        next()
      } catch (error) {
        await userStore.userLogout()
        next(`/login?redirect=${to.path}`)
      }
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } else {
    if (token && to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  }
})

//路由后置守卫
router.afterEach(() => {
  NProgress.done()
})
