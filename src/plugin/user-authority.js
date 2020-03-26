/**
 * 用户权限弹窗插件 v1.0
 *
 * 组件内具体用法：
 * 为了能够阻止浏览器默认事件和事件冒泡，必须要给按钮或链接里面添加一个标签，然后在该标签上绑定指令v-user-authority，例如
 * <button><span v-user-authority="1"></span></button>
 * <router-link to="/"><span v-user-authority="1"></span></router-link>
 *
 * 指令v-user-authority的参数说明：
 * 1：需要登录及以上用户
 * 2：需要前程卡及以上用户
 * 3：需要金卡及以上用户
 * 8：需要钻石卡用户
 *
 * 流程：
 * 1. 点击按钮或链接后，从store里面获取用户类型和用户权限规则
 * 2. 获取按钮或链接上的权限要求，并与权限规则进行匹配
 * 3. 弹窗或不弹窗
 */

// PLUGIN NAME
const userAuthority = {}

// install
userAuthority.install = function (Vue, options) {
  // 指令v-user-authority，放在按钮或链接上面
  Vue.directive('user-authority', {
    bind (el, binding, vnode) {
      // 给按钮或链接绑定click事件
      el.addEventListener('click', function (event) {
        // app的根组件
        const vmRoot = vnode.context.$root
        // 权限弹窗组件
        const vmGUserAuthorityModal = vmRoot.$children[0].$refs.gUserAuthorityModal

        // 获取用户类型
        const utype = vmRoot.$store.state.app.user.utype

        // 获取用户权限规则
        const authorityRules = vmRoot.$store.state.app.userAuthority

        // 获取按钮或链接上的权限要求
        const authority = binding.value

        // 如果权限要求值为空，返回
        if (!authority) return

        // 获取匹配的某一条具体规则
        const rule = authorityRules[authority]

        // 如果是未登录用户，去登录页，登录成功后，返回当前页
        if (utype === 0) {
          event.preventDefault()
          event.stopImmediatePropagation()
          vmGUserAuthorityModal.$linkToLogin()
          return
        }

        // 如果是已登录用户，根据匹配的规则，弹窗
        if (rule && rule.match.includes(utype)) {
          event.preventDefault()
          event.stopImmediatePropagation()
          if (rule.modal === 'login') {
            vmGUserAuthorityModal.$linkToLogin()
          } else if (rule.modal === 'vip') {
            vmGUserAuthorityModal.$showVipModal(rule.modalTxt)
          }
        }
      }, false)
    }
  })
}

export default userAuthority
