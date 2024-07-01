import request from '@/utils/request'
import { TrademarkPageParams, TrademarkResult } from '@/api/product/trademark/type.ts'
import { BaseResponse } from '@/api/common/type.ts'

enum API {
  //获取品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

/**
 * 获取品牌列表
 * @param params 参数信息
 */
export const getTrademarkList = (params: TrademarkPageParams) =>
  request.get<null, BaseResponse<TrademarkResult>, null>(API.TRADEMARK_URL + `/${params.current}/${params.size}`)
