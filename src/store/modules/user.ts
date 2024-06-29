// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginBody, loginResult } from '@/api/user/type.ts'
import { getUserInfo, login, logout } from '@/api/user/index.ts'
import { UserState } from '@/store/modules/types/type.ts'
import * as tokenUtil from '@/utils/tokenUtil.ts'
import { constantRoutes } from '@/router/router.ts'

export default defineStore('user', {
  state: (): UserState => {
    return {
      token: tokenUtil.GET_TOKEN(),
      menuRoutes: constantRoutes,
      userInfo: {
        username: '',
        avatar: ''
      }
    }
  },
  actions: {
    // 异步返回的promise
    // 用户登录
    async userLogin(data: loginBody) {
      const result: loginResult = await login(data)
      // 如果code为200，表示登录成功
      if (result.code === 200) {
        this.token = (result.data.token as string)
        // 将token存入localStorage
        tokenUtil.SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 用户登出
    async userLogout() {
      // 1.发送请求到后端，让后端销毁token
      const result = await logout()
      if (result.code === 200) {
        // 2.销毁本地的token并请求userInfo
        tokenUtil.REMOVE_TOKEN()
        this.token = null
        this.userInfo = {
          username: '',
          avatar: '',
        }
        return 'ok'
      } else {
        return Promise.reject(new Error('登出失败'))
      }

    },
    // 获取用户信息
    async fetchUserInfo() {
      const userInfo = await getUserInfo()
      if (userInfo.code === 200) {
        this.userInfo.username = userInfo.data.checkUser.username
        this.userInfo.avatar = userInfo.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error('获取用户信息失败'))
      }
    }
  },
  getters: {
    // 获取token
    getToken(): string | null {
      return this.token
    },
    getUserInfo(): {
      username: string;
      avatar: string;
    } {
      return this.userInfo
    }
  }
})
