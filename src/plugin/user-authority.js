// 用户权限控制插件
const userAuthority = {}

userAuthority.install = function (Vue) {
  Vue.directive('authority', {
    bind (el, binding, vnode) {
      el.addEventListener('click', function (event) {
        // 当前vue根实例
        const vmRoot = vnode.context
        // 当前用户权限
        const utype = vmRoot.$store.state.app.user.utype
        //  要求用户权限
        const requireAuthority = binding.value
        // 用户权限表
        const userAuthorityMap = vmRoot.$store.state.app.userAuthority
        
        if (!utype) {
          event.preventDefault()
          event.stopImmediatePropagation()
          vmRoot.$store.commit('updateLogin', true)
          return
        }
        if (utype && userAuthorityMap[requireAuthority].match.includes(Number(utype))) {
          event.preventDefault()
          event.stopImmediatePropagation()
          vmRoot.$refs.gAuthority.$showModal(userAuthorityMap[requireAuthority].modalTxt)
        }
      }, false)
    }
  })
}
export default userAuthority
