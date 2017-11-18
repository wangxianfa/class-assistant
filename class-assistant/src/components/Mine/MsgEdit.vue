<template>
  <div id="msgedit">
    <mt-header fixed title="QQ号" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right">保存</mt-button>
    </mt-header>

    <div class="edit">
      <p>请输入QQ号: </p>
      <input type="text" placeholder="请输入正确的QQ号">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsgEdit'
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #msgedit{
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

  .edit{
    &>p{
      padding: 0 12px;
    }
    &>input[type='text']{
      width: 100%;
      height: 36px;
      text-indent: 12px;
      margin-top: 10px;
    }
  }
</style>
