// 弹窗控制
const state = {
  login: false,
  authority: false
}

const mutations = {
  updateLogin(state, payload) {
    state.login = payload
  },
  updataAuthority(state, payload) {
    state.authority = payload
  }
}

export default {
  state,
  mutations
}