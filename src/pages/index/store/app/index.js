import userAuthority from './user-authority'
import user from './user'

const state = {
  user: user.state,
  userAuthority: userAuthority.state
}

const mutations = {
  ...user.mutations
}

export default {
  state,
  mutations
  // ...user
}