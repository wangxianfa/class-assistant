<template>
    <div id="publish_dynamic">
      <mt-header fixed title="添加动态" class="header">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div class="container"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'publishDynamic',
    data () {
      return {
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    @import url(../../common/styles/base.less);
  
    #publish_dynamic,
    .container{
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
  
    .container{
      padding-bottom: calc(~"@{footerHeight}");
    }
  
  </style>
  