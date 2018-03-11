<template>
  <div id="app">
    <Message></Message>
    <router-view/>
  </div>
</template>

<script>
import Message from '@/base/Message/Message'
export default {
  name: 'app',
  components: {
    Message
  }
}
</script>

<style lang="less">
  @import url(./common/styles/default.less);

  #app {
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /* margin-top: 60px; */
    height: 100%;
    overflow-y: auto;
  }

  html,
  body
  {
    user-select: none;
  }

  .mint-msgbox{
    padding-bottom: 12px;

    >.mint-msgbox-content
    {
      padding: 24px 20px 16px !important;
      border-bottom: none;

      >.mint-msgbox-message{
        color: #333;
      }
    }
  }

  .mint-msgbox-btns{
    
    float: right;
    padding: 0 20px;

    >.mint-msgbox-btn{
      margin-left: 32px;
    }

    >.mint-msgbox-cancel {
      border-right: none;
    }
  }

</style>

