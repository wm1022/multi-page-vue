const state = {
  utype: 0,
  userName: '未登录'
}

const mutations = {
  // 升级user权限
  updateUser (state, payload) {
    state.user.utype = payload.utype
    state.user.userName = payload.userName
  }
}

export default {
  state,
  mutations
}