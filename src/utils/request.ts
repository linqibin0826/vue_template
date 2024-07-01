import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 5000,
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  // 在请求头中添加token等操作
  if (userStore.getToken !== null || userStore.getToken !== '') {
    config.headers.token = userStore.getToken
  }
  return config
})

// 配置响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
  // 对响应数据进行处理
  return response.data
}, (error) => {
  // 对响应错误进行处理
  //处理网络错误
  let msg = ''
  const status = error.response.status
  switch (status) {
    case 401:
      msg = 'token过期'
      break
    case 403:
      msg = '无权访问'
      break
    case 404:
      msg = '请求地址错误'
      break
    case 500:
      msg = '服务器出现问题'
      break
    default:
      msg = '无网络'

  }
  ElMessage({
    type: 'error',
    message: msg,
  })
  return Promise.reject(error)
})

export default request
