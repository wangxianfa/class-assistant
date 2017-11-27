<template>
  <div class="about">
    <mt-header fixed title="关于助手" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

</style>
