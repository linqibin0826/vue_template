// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginBody } from '@/api/user/type.ts'
import { getUserInfo, login, logout } from '@/api/user/index.ts'
import { UserState } from '@/store/modules/types/type.ts'
import * as tokenUtil from '@/utils/tokenUtil.ts'
import { constantRoutes } from '@/router/router.ts'
import { BaseResponse } from '@/api/common/type.ts'

export default defineStore('user', {
  state: (): UserState => {
    return {
      token: tokenUtil.GET_TOKEN(),
      menuRoutes: constantRoutes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 异步返回的promise
    // 用户登录
    async userLogin(data: loginBody) {
      const result: BaseResponse<string> = await login(data)
      // 如果code为200，表示登录成功
      if (result.code === 200) {
        this.token = result.data
        // 将token存入localStorage
        tokenUtil.SET_TOKEN(result.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
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
        this.username = ''
        this.avatar = ''
        return 'ok'
      } else {
        return Promise.reject(new Error('登出失败'))
      }

    },
    // 获取用户信息
    async fetchUserInfo() {
      const userInfo = await getUserInfo()
      if (userInfo.code === 200) {
        this.username = userInfo.data.name
        this.avatar = userInfo.data.avatar
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
    getUsername(): string {
      return this.username
    }
  }
})
