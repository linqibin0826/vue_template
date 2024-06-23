import request from '@/utils/request.ts'
import { loginBody, loginResult, userInfoResult } from '@/api/user/type.ts'

// 项目用户相关接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info'
}

// 登录
export const login = (data: loginBody) => request.post<loginBody, loginResult, any>(API.LOGIN_URL, data)

// 获取用户信息
export const getUserInfo = () => request.get<null, userInfoResult, any>(API.USERINFO_URL)
