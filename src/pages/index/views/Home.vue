<template>
  <div class="home">
    <div class="tips">通过按钮模拟用户权限操作，点击按钮，如果权限验证通过提示成功，否则弹出对应提示</div>
    <el-button>无需权限</el-button>
    <el-button type="primary">需要登录</el-button>
    <el-button type="success">需要vip</el-button>
    <el-button type="warning">需要svip</el-button>
    <el-button type="danger">需要ssvip</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.home {

  .tips {
    color: #eb0000;
    padding: 50px 0;
  }

}
</style>>
