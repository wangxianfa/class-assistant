<template>
  <div id="warn">
    <mt-header fixed title="消息提醒" class="header">
      <router-link to="/setting" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="msg-setting">
      <mt-cell title="声音">
        <mt-switch v-model="voice"></mt-switch>
      </mt-cell>
      <mt-cell title="震动">
        <mt-switch v-model="shake"></mt-switch>
      </mt-cell>
    </div>

  </div>
</template>

<script>
export default {
  name: 'msgWarn',
  data () {
    return {
      voice: false,
      shake: false
    }
  }

}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #warn{
    min-height: 100%;
    background-color: #f9f9f9;
  }

  .msg-setting{
    padding-top: calc(~"@{headerHeight} + 24px");
  }

  .mint-cell+.mint-cell{
    border-top: 1px solid #f8f8f8;
  }
</style>
