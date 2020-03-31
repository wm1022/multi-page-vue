<template>
  <div class="g-authority">
    <el-dialog
    title="提示"
    :visible.sync="authorityVisible"
    width="30%">
    <span>需要{{modalTxt}}权限</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="authorityVisible = false">确定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'gAuthority',
  data() {
    return {
      authorityVisible: false,
      modalTxt: ''
    }
  },
  // computed: {
  //   authorityVisible: {
  //     get () {
  //       return this.$store.state.model.authority
  //     },
  //     set (newVal) {
  //       this.$store.commit('updateAuthority', newVal)
  //     }
  //   }
  // },
  methods: {
    $showModal (modalTxt) {
      this.authorityVisible = true
      this.modalTxt = modalTxt
    }
  }
}
</script>

<style lang="scss">

</style>