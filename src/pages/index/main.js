import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import userAuthority from '../../plugin/user-authority'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(userAuthority)

router.beforeEach((to, from, next) => {
  // 未登录
  if (!store.state.app.user.utype && to.meta.requireAuthority && to.meta.requireAuthority !== 0) {
    store.commit('updateLogin', true)
    return next(false)
  } else if (store.state.app.user.utype && to.meta.requireAuthority && store.state.app.userAuthority[to.meta. requireAuthority].match.includes(Number(store.state.app.user.utype))) {
    return next({ name: 'PageNotFound' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
