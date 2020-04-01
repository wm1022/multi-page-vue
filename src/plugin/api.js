import { _http } from './http'
import { deepCopy, isObject, isObjectValueEqual } from './util'

const pluginName = '$api'
const plugin = {}

function init(Vue, options) {
  const store = options.store
  const http = _http(options.axiosConfig)

  function Api() {}

  Api.prototype.get = function (...args) {
    console.log(args[0])
    return this.ajax('get', args[0], args[1])
  }

  Api.prototype.post = function (...args) {
    return this.ajax('post', args[0], args[1], args[2])
  }

  Api.prototype.ajax = function (method, url, config, postData) {
    
    if (!config) {
      config = {}
    }

    // store模块命名
    const namespace = url.replace(/\//g, '')

    // 如果api模块不存在，动态注册
    if (!store.state.api) {
      store.registerModule('api', {})
    }

    // 如果store模块不存在，动态注册
    if (!store.state.api[namespace]) {
      this.createStoreModule(namespace)
    }

    // 是否缓存数据
    const cache = typeof config.cache === 'boolean' ? config.cache : false
    delete config.cache
    // 如果是get方法，且cache是true，且params相同，且已有数据缓存，从store读取
    if (method.toLowerCase() === 'get' && cache && ((store.state.api[namespace].params === undefined && config.params === undefined) || (isObject(store.state.api[namespace].params) && isObject(config.params) && isObjectValueEqual(store.state.api[namespace].params, config.params))) && store.state.api[namespace].response) {
      return new Promise((resolve) => {
        resolve(JSON.parse(JSON.stringify(store.state.api[namespace].response)))
      })
    }

    return store.dispatch(namespace, {
      method,
      url,
      config: config,
      postData
    })
  }

  Api.prototype.createStoreModule = function (namespace) {
    store.registerModule(['api', namespace], {
      state: {
        params: undefined,
        response: undefined
      },
      actions: {
        [namespace] ({ dispatch, commit }, payload) {
          // 添加headers.accessToken
          payload.config.headers = {
            'accessToken': store.state.app.user.accessToken
          }
          return new Promise((resolve, reject) => {
            // 301刷新refreshToken处理
            function refreshTokenOption (res) {
              console.log(res)
              if (res.error === 301) {
                // 若token过期， 通过refreshToken重新获取token
                http.get('app/accessToken', {
                  params: {
                    refreshToken: store.state.app.user.refreshToken
                  },
                  timeout: 20000
                }).then((response) => {
                  if (response.error === 0) { // 重新请求accessToken成功
                    commit('updateAccessToken', {
                      accessToken: response.data
                    })
                    // 获取新的token之后重新发起请求获取数据
                    dispatch(namespace, {
                      method: payload.method,
                      url: payload.url,
                      config: payload.config,
                      postData: payload.postData
                    })
                  } else {
                    // 重新请求accessToken失败
                    // 这里可以做退出登录的操作
                    console.log('刷新accessToken失败')
                  }
                }).catch((error) => {
                  if (error.message !== 'canceled') reject(error)
                })
              } else {
                // 返回数据符合符合条件时，写入store（get请求数据才写入store）
                if (res.error === 0 && payload.method === 'get') {
                  commit(namespace, {
                    params: deepCopy(payload.config.params),
                    response: deepCopy(res)
                  })
                }
                resolve(res)
              }
            }
            if (payload.method === 'get') {
              http.get(payload.url, payload.config).then((res) => {
                refreshTokenOption(res)
              }).catch(error => {
                if (error.message !== 'canceled') reject(error)
              })
            }
            if (payload.method === 'post') {
              http.post(payload.url, payload.postData, payload.config).then(res => {
                refreshTokenOption(res)
              }).catch(error => {
                if (error.message !== 'canceled') reject(error)
              })
            }
            if (payload.method === 'put') { // put
              http.put(payload.url, payload.postData, payload.config)
                .then((response) => {
                  // 如果accessToken过期，用refreshToken重新请求accessToken
                  refreshTokenOption(response)
                })
                .catch((error) => {
                  if (error.message !== 'canceled') reject(error)
                })
            }
          })
        }
      },
      mutations: {
        [namespace] (state, payload) {
          state.params = payload.params,
          state.response = payload.response
        }
      }
    })
  }

  return new Api()

  // Api.prototype.createStoreModule = function (namespace) {

  // }

}

plugin.install = (Vue, options) => {
  Object.defineProperty(Vue.prototype, pluginName, { value: init(Vue, options)})
}

export default plugin