// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginBody, loginResult } from '@/api/user/type.ts'
import { getUserInfo, login } from '@/api/user/index.ts'
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
    // 用户登录
    async userLogin(data: loginBody) {
      const result: loginResult = await login(data)
      // 如果code为200，表示登录成功
      if (result.code === 200) {
        this.token = (result.data.token as string)
        // 将token存入localStorage
        tokenUtil.SET_TOKEN(result.data.token as string)
      } else {
        // 登录失败，抛出错误
        throw new Error(result.data.message)
      }
    },
    // 用户登出
    userLogout() {
      // 1.发送请求到后端，让后端销毁token
      // 2.销毁本地的token并请求userInfo
      tokenUtil.REMOVE_TOKEN()
      this.userInfo = {
        username: '',
        avatar: ''
      }
    },
    async fetchUserInfo() {
      const userInfo = await getUserInfo()
      if (userInfo.code === 200) {
        this.userInfo.username = userInfo.data.checkUser.username
        this.userInfo.avatar = userInfo.data.checkUser.avatar
      } else {
        throw new Error('获取用户信息失败')
      }
    }
  },
  getters: {
    // 获取token
    getToken(): string {
      return this.token
    },
    getUserInfo(): {
      username: string;
      avatar: string;
    } {
      return this.userInfo
    }
  },
})
