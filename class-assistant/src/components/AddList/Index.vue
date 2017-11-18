<template>
  <div id="addlist">
    <mt-header fixed title="通讯录" class="header">
      <mt-button slot="right">添加</mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'AddList'
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #addlist{
    height: 667px;
    background-color: #f9f9f9;
    padding-top: calc(~"@{headerHeight} + 20px");
  }

  .header{
    background-color: #fff;
    color: #4a4a4a;
    border-bottom: 1px solid #e1e1e1;
    .is-left *,
    .is-right *
    {
      color: #26a2ff !important;
    }
  }
</style>
