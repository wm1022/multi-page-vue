/**
 * 用户权限规则
 * utype规则：0 未登录
 *            1 普通登录用户
 *            3 vip用户
 *            5 金卡用户
 *            6 尊享卡用户
 */

// ==========
// state
const state = {
  // 用户权限规则
  // 顺序从低到高
  // key是用于匹配的自定义指令传递的data-userAuthority值
  // match是用于匹配的用户类型UType(登录后接口返回的值)，如果匹配，则弹窗
  // 例：如果该功能需要登录且当前用户未登录，那么v-userAuthority=1，utype为0，则与key为1的match匹配，调出登录弹窗，需要注意的是match匹配的是达不到要求权限的utype
  // modal是弹窗类型，'login'是登录弹窗，'vip'是权限提示弹窗
  // modalTxt是用于在权限弹窗里面的文字
  1: {
    match: [0], // uType默认是0,未登录状态
    modal: 'login'
  },
  3: {
    match: [1],
    modal: 'vip',
    modalTxt: 'vip'
  },
  5: {
    match: [1, 3],
    modal: 'vip',
    modalTxt: '金卡'
  },
  6: {
    match: [1, 3, 5],
    modal: 'vip',
    modalTxt: '尊享卡'
  }
}

export default {
  state
}
