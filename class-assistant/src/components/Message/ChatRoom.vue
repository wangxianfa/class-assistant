<template>
  <div id="chatroom">
    <mt-header fixed :title="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="msgwrap">
      <Dialogue :data="{nickname: '机器人小发', info: dialog || 'hi, 我是机器人小发，有什么能够帮助你的(*^▽^*)'}" />
    </div>

    <div id="bottomZone">
      <div class="inputBox">
        <input @keyup.enter="sendClick" type="text" v-model="dialog">
        <button @click="sendClick">发送</button>
      </div>
      <div class="funcbar">
        <i class="fa fa-microphone" @click="microphoneClick"></i>
        <i class="fa fa-photo" @click="photoClick"></i>
        <i class="fa fa-camera" @click="cameraClick"></i>
        <i class="fa fa-hand-o-left" @click="shakeClick"></i>
        <i class="fa fa-money" @click="bonusClick"></i>
        <i class="fa fa-video-camera" @click="videoClick"></i>
        <i class="fa fa-smile-o" @click="smileClick"></i>
        <i class="fa fa-plus-circle" @click="otherClick"></i>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
const Dialogue = () => import('./Dialogue.vue')

export default {
  name: 'ChatRoom',
  data () {
    return {
      header: '',
      avatar: '',
      dialog: ''
    }
  },
  methods: {
    microphoneClick: function () {
      console.log('microphoneClick')
    },
    photoClick: function () {
      console.log('photoClick')
    },
    cameraClick: function () {
      console.log('cameraClick')
    },
    shakeClick: function () {
      console.log('shakeClick')
    },
    bonusClick: function () {
      console.log('bonusClick')
    },
    videoClick: function () {
      console.log('videoClick')
    },
    smileClick: function () {
      console.log('smileClick')
    },
    otherClick: function () {
      console.log('otherClick')
    },
    sendClick: function () {
      this.chatWithRobot(this.dialog)
      // console.log('send')
    },
    chatWithRobot: function (info, location = '武汉市洪山区') {
      // POST 实现，有跨域障碍
      axios({
        method: 'POST',
        baseURL: '/robot',
        url: '',
        data: {
          key: '7b2c607eead1445da35aacd831a1c6a1',
          info: info,
          loc: location,
          userid: 'xiaoxiaofa'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        this.dialog = ''
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
      // GET 方法实现
      // axios.get('http://www.tuling123.com/openapi/api', {
      //   params: {
      //     key: '7b2c607eead1445da35aacd831a1c6a1',
      //     userid: 'xiaoxiaofa',
      //     info: info,
      //     loc: location
      //   }
      // }).then((response) => {
      //   this.dialog = ''
      //   console.log(response.data.text)
      // }).catch((error) => {
      //   console.log(error)
      // })
    }
  },
  mounted () {
    this.header = this.$route.params.header
    this.avatar = this.$route.params.avatar
  },
  components: {
    Dialogue
  }
}
</script>

<style lang="less" scoped>

  @import url(../../common/styles/base.less);

  #chatroom{
    height: 100%;
    background-color: #eff2f7;
  }

  #bottomZone{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }

  .msgwrap{
    height: 100%;
    padding-top: @headerHeight;
    padding-bottom: @footerHeight;
    box-sizing: border-box;
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
