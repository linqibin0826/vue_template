/**
 * 全部接口返回数据都有的数据类型
 */
export interface BaseResponse<T> {
  code: number
  message: string
  ok: boolean
  data: T
}

/**
 * 分页参数类型
 */
export interface PageParams {
  current: number
  size: number
}
