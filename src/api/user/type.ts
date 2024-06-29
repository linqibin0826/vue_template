/**
 * 登录接口请求数据类型
 */
export interface loginBody {
  username: string
  password: string
}

/**
 * 全部接口返回数据都有的数据类型
 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/**
 * 登录接口返回数据类型
 */
export interface loginResult extends ResponseData{
  data: string
}

/**
 * 获取用户信息接口返回数据类型
 */
export interface userInfoResult extends ResponseData {
  data: {
    avatar: string
    name: string
    roles: string[]
    buttons: string[]
    routes: string[]
  }
}
