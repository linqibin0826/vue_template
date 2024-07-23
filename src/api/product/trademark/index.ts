import request from '@/utils/request'
import { TrademarkDetail, TrademarkPageParams, TrademarkResult } from '@/api/product/trademark/type.ts'
import { BaseResponse } from '@/api/common/type.ts'

enum API {
  //获取品牌列表
  TRADEMARK_URL = '/admin/product/baseTrademark',
  //添加品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',

  //修改已有品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',

  //删除已有品牌
  DELETE_URL = '/admin/product/baseTrademark/remove',
}

/**
 * 获取品牌列表
 * @param params 参数信息
 */
export const getTrademarkList = (params: TrademarkPageParams) =>
  request.get<null, BaseResponse<TrademarkResult>, null>(API.TRADEMARK_URL + `/${params.current}/${params.size}`)

/**
 * 新增或修改品牌信息
 * @param trademark 品牌信息
 */
export const addOrUpdateTrademark = (trademark: TrademarkDetail) => {
  if (trademark.id === null) {
    return request.post<boolean, TrademarkDetail>(API.ADD_TRADEMARK_URL, trademark)
  } else {
    return request.post<boolean, TrademarkDetail>(API.UPDATE_TRADEMARK_URL, trademark)
  }
}

/**
 * 删除品牌
 * @param trademark 品牌信息
 */
export const deleteTrademark = (trademark: TrademarkDetail) => {
  return request.delete<any, any>(API.DELETE_URL + '/' + trademark.id)
}

