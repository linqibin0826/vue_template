import { PageParams } from '@/api/common/type.ts'

/**
 * @description: 品牌分页请求参数
 */
export interface TrademarkPageParams extends PageParams {

}



/**
 * @description: 品牌分页响应数据
 */
export interface TrademarkResult {
  current: number
  pages: number
  size: number
  total: number
  records: Trademark[]
  searchCount: boolean
  hitCount: boolean
}

/**
 * @description: 品牌数据
 */
export interface Trademark {
  id: number
  logoUrl: string
  tmName: string
  createTime: string
  updateTime: string
}
