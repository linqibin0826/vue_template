// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { loginBody, loginResult } from '@/api/user/type.ts'
import { login } from '@/api/user/index.ts'
import { UserState } from '@/store/modules/types/type.ts'
import * as tokenUtil from '@/utils/tokenUtil.ts'
import { constantRoutes } from '@/router/router.ts'

export default defineStore('user', {
  state: (): UserState => {
    return {
      token: tokenUtil.GET_TOKEN(),
      menuRoutes: constantRoutes,
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
  },
  getters: {},
})
