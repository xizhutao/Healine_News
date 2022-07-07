import axios from 'axios'
import store from '@/store'
// import JSONBig from 'json-bigint'
const instant = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [function (data) {
  //   // 对 data 进行任意转换处理
  //   try {
  //     return JSONBig.parse(data)
  //   } catch (err) {
  //     return data
  //   }
  // }]
})
// 拦截器
// 添加请求拦截器
instant.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.user && store.state.user.token) {
    config.headers = {
      Authorization: 'Bearer ' + store.state.user.token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instant.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instant
