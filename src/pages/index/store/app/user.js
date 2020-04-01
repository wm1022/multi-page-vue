const state = {
  utype: 0,
  userName: '未登录',
  accessToken: '',
  refreshToken: 'hev907bud688hbd8y7y9'
}

const mutations = {
  // 升级user权限
  updateUser (state, payload) {
    state.user.utype = payload.utype
    state.user.userName = payload.userName
  },
  updateAccessToken (state, payload) {
    state.user.accessToken = payload
  }
}

export default {
  state,
  mutations
}