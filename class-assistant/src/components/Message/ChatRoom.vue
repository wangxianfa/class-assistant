<template>
  <div id="chatroom">
    <mt-header fixed :title="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <div class="msgwrap" ref="msgwrap">
      <Dialogue v-for="(item, index) in items" :key="index" :data="{nickname: item.nickname, avatar: item.avatar, self: item.self, showNickname: item.showNickname}">
        <p slot="text" v-if="item.code !== 308000 && item.code !== 302000">{{ item.text }}</p>
        <a :href="item.url ? item.url : ''" slot="url" target="_blank">{{item.url ? '链接：' + item.url : '' }}</a>
        <ul slot="list" class="list">
          <li v-for="(list, index) in item.list" :key="index">
            <h2>{{list.name || list.source}}</h2>
            <p>{{list.info || list.article}}</p>
            <img v-lazy="list.icon" :alt="list.name" />
            <a :href="list.detailurl" target="_blank">{{'链接：' + list.detailurl}}</a>
          </li>
        </ul>
      </Dialogue>
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
      dialog: '',
      items: []
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
      const data = {
        code: '123456',
        text: this.dialog,
        url: '',
        list: [],
        self: true,
        avatar: '/static/images/1.png',
        nickname: '小小发'
      }
      this.items.push(data)
      this.chatWithRobot(this.dialog)
    },
    changeHeight: function () {
      console.log('scrollTop: ' + this.$refs.msgwrap.scrollTop)
      console.log('scrollHeight: ' + this.$refs.msgwrap.scrollHeight)
      this.$refs.msgwrap.scrollTop = this.$refs.msgwrap.scrollHeight
    },
    chatWithRobot: function (info, location = '武汉市洪山区') {
      // POST 实现，有跨域障碍
      // axios 方法实现, 传递的数据会被转为字符串，通过设置 'Content-Type': 'application/json' 解决
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
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.dialog = ''
        const res = JSON.parse(JSON.stringify(response.data))
        const data = {
          code: res.code,
          text: res.text,
          url: res.url ? res.url : '',
          list: res.list ? res.list : [],
          self: false,
          nickname: '小小发的小管家'
        }
        this.items.push(data)
      }).catch((error) => {
        console.log(error)
      })

      // axios.post 方法实现
      // axios.post('/robot', {
      //   'key': '7b2c607eead1445da35aacd831a1c6a1',
      //   'info': info,
      //   'loc': location,
      //   'userid': 'xiaoxiaofa'
      // }).then((response) => {
      //   this.dialog = ''
      //   console.log(response)
      // }).catch((error) => {
      //   console.log(error)
      // })

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

    this.$refs.msgwrap.addEventListener('resize', this.changeHeight)
  },
  components: {
    Dialogue
  },
  watch: {
    items: function () {
      this.$nextTick(() => {
        this.changeHeight()
      })
    }
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
    padding-top: 0;
  }

  .msgwrap{
    width: 100%;
    height: calc(~"100% - @{headerHeight} - 90px");
    margin-top: @headerHeight;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    position: fixed;
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
