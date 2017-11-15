<template>
  <div id="chatroom">
    <mt-header fixed title="腾讯新闻">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div id="bottomZone">
      <div class="inputBox">
        <input type="text">
        <button>发送</button>
      </div>
      <div class="funcbar">
        <i class="fa fa-microphone"></i>
        <i class="fa fa-photo"></i>
        <i class="fa fa-camera"></i>
        <i class="fa fa-hand-o-left"></i>
        <i class="fa fa-money"></i>
        <i class="fa fa-video-camera"></i>
        <i class="fa fa-smile-o"></i>
        <i class="fa fa-plus-circle"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoom'
}
</script>

<style lang="less" scoped>
  #chatroom{
    height: 1000px;
    background-color: #eff2f7;
  }
  header{
    height: 54px;
    font-size: 18px;
  }

  #bottomZone{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }

  .inputBox{
    display: flex;
    margin-bottom: 10px;
    &>input{
      background-color: #fff;
      height: 36px;
      border: none;
      border-radius: 5px;
      margin-right: 12px;
      flex: 1;
      outline: none;
      font-size: 16px;
      text-indent: 4px;
    }
    &>button{
      background-color: #dedde2;
      border: none;
      color: #fff;
      border-radius: 5px;
      padding: 0 12px;
      outline: none;
    }
  }

  .funcbar{
    display: flex;
    justify-content: space-between;
    
    &>i{
      font-size: 24px;
      color: #7e8492;
    }
  }
</style>
