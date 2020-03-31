<template>
  <el-dialog
    title="提示"
    :visible.sync="loginVisible"
    width="30%">
    <span>您需要先登录</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="loginVisible = false">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'gLogin',
  data() {
    return {

    }
  },
  computed: {
    loginVisible: {
      get() {
        return this.$store.state.modal.login
      },
      set(newVal) {
        this.$store.commit('updateLogin', newVal)
      }
    }
  }
}
</script>

<style lang="scss">

</style>