import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './app/index'
import modal from './module/modal'

export default new Vuex.Store({
  modules: {
    app,
    modal
  },
  strict: process.env.NODE_ENV !== 'production'
})
