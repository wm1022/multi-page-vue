import axios from 'axios'
import qs from 'qs'
import promise from 'es6-promise'

promise.polyfill()

const pluginName = '$http'
const plugin = {}

function init (options) {
  // 创建axios实例
  const http = axios.create({
    baseURL: options && options.baseURL ? options.baseURL : '',
    timeout: 20000
  })

  // 请求拦截器
  http.interceptors.request.use(
    config =>  {
      if (config.methods === 'post' || config.method === 'put') {
        // 当接口格式需要为application/json时，data 不需要被qs处理，在对应接口请求里面配置Content-Type为application/json
        if (config.headers.post['Content-Type'] === 'application/json') {
          return config
        }
        // application/x-www-form-urlencoded
        config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
      }
      if (config.methods === 'get') {
        config.paramsSerializer = function (params) {
          return qs.stringify(params, {arrayFormat: 'repeat'})
        }
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  http.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      return Promise.reject(error)
    }
  )

  return http
}

// install
plugin.install = (Vue, options) => {
  Object.defineProperty(Vue.prototype, pluginName, { value: init(options) })
}

// 默认导出，作为vue插件
export default plugin

// 独立使用，不作为vue插件
export function _http (options) {
  return init(options)
}
