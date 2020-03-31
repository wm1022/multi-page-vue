<template>
  <div class="home">
    <div class="tips">通过按钮模拟用户权限操作，点击‘升级权限’按钮进行权限升级，如果权限验证通过提示成功，否则弹出对应提示，如果未登录调出登录弹窗</div>
    <div class="active-authority">
      <span>当前权限：{{activeAuthority}}</span>
      <el-button type="primary" @click="updateAuthority">升级权限</el-button>
    </div>
    <el-button @click="handler"><em>无需权限</em></el-button>
    <el-button type="primary" class="button" @click="handler"><em v-authority="1">需要登录</em></el-button>
    <el-button type="success" class="button" @click="handler"><em v-authority="3">需要vip</em></el-button>
    <el-button type="warning" class="button" @click="handler"><em v-authority="5">需要金卡</em></el-button>
    <el-button type="danger" class="button" @click="handler"><em v-authority="6">需要尊享卡</em></el-button>

    <p class="router">路由权限控制</p>
    <router-link :to="{name: 'About'}"><span v-authority="6">关于我们</span></router-link>

    <gLogin ref="rererer"></gLogin>

    <gAuthority ref="gAuthority"></gAuthority>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import gLogin from '../components/gLogin'
import gAuthority from '../components/gAuthority'
export default {
  name: 'Home',
  data () {
    return {
      userMap: [
        {0: '未登录'},
        {1: '普通用户'},
        {3: 'vip用户'},
        {5: '金卡用户'},
        {6: '尊享卡用户'}
      ],
      activeIndex: 0,
      activeAuthority: ''
    }
  },
  computed: {
    ...mapState({
      app: state => state.app
    })
    // user: {
    //   get () {
    //     return this.$store.state.app
    //   },
    //   set (newVal) {
    //     this.$store.commit('updateUser', newVal)
    //   }
    // }
  },
  methods: {
    updateAuthority () {
      this.activeIndex++
      if (this.activeIndex >= this.userMap.length) {
        this.$message.warning('您已是最高权限')
        return
      }
      const utype = Object.keys(this.userMap[this.activeIndex])[0]
      const payload = {
        utype: utype,
        userName: this.userMap[this.activeIndex][utype]
      }
      this.$store.commit('updateUser', payload)
      this.activeAuthority = this.userMap[this.activeIndex][this.app.user.utype]
    },
    handler () {
      this.$message.success('成功')
    }
  },
  created () {
    // 获取当前用户权限
    this.activeAuthority = this.userMap[this.activeIndex][this.app.user.utype]
    // 计算属性的set, 可以触发vuex更新，但是如果更新某个具体的属性，vuex还是会报警告
    // this.user = {
    //   userName: 111,
    //   user: 22
    // }
  },
  components: {
    gLogin,
    gAuthority
  }
}
</script>

<style lang="scss">
.home {

  .tips {
    color: #eb0000;
    padding: 50px 0;
  }

  .active-authority {
    padding: 0 0 50px;

    .el-button {
      margin-left: 20px;
    }

  }

  .button {
    padding: 0;
    
    em {
      display: block;
      padding: 12px 20px;
      // width: 100%;
      // height: 100%;
    }

  }

  .router {
    padding: 100px 0 10px;
    color: #eb0000;
  }

}
</style>
