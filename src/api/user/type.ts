/**
 * 登录接口请求数据类型
 */
export interface loginBody {
  username: string
  password: string
}

/**
 * 获取用户信息接口返回数据类型
 */
export interface userInfoResult {
  avatar: string
  name: string
  roles: string[]
  buttons: string[]
  routes: string[]
}
