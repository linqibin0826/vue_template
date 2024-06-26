import request from '@/utils/request.ts'
import { loginBody, userInfoResult } from '@/api/user/type.ts'
import { BaseResponse } from '@/api/common/type.ts'

// 项目用户相关接口
//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/test-api/admin/acl/index/login',
  USERINFO_URL = '/test-api/admin/acl/index/info',
  LOGOUT_URL = '/test-api/admin/acl/index/logout',
}

// 登录
export const login = (data: loginBody) => request.post<loginBody, BaseResponse<string>, any>(API.LOGIN_URL, data)

// 获取用户信息
export const getUserInfo = () => request.get<null, BaseResponse<userInfoResult>, any>(API.USERINFO_URL)

// 退出登录
export const logout = () => request.post<null, any, null>(API.LOGOUT_URL)
