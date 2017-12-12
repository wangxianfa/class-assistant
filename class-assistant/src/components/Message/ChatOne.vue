<template>
  <div id="chatroom">
    <mt-header fixed :title="dataList.chatWith">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <span slot="right">
        <i class="fa fa-phone" aria-hidden="true"></i>
        <i class="fa fa-user"></i>
      </span>
    </mt-header>

    <div class="msgwrap" ref="msgwrap">
      <Dialogue v-for="(item, index) in dataList.message" :key="index" :data="{nickname: dataList.chatWith, avatar: item.content.avatar, self: item.content.from == 'me' ? true : false}">
        <p slot="text" v-if="item.code !== 308000 && item.code !== 302000">{{ item.text || item.content.message }}</p>
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
        <input @keyup.enter="sendMessage" type="text" v-model="dialog">
        <button @click="sendMessage">发送</button>
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

import { mapGetters } from 'vuex'
import axios from 'axios'
import * as api from '@/api/chat'
import {parseChatTime} from '@/common/js/parse-time'
const Dialogue = () => import('./Dialogue.vue')

export default {
  name: 'ChatRoom',
  data () {
    return {
      dialog: '',
      unread: 0,
      dataList: {
        userid: '',   // 别人的id
        chatWith: '正在加载中...',  // 自己对别人的备注
        avatar: '',  // 别人的头像
        beizhu: '',  // 别人对自己的备注
        message: [ ]  // 消息
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userInfo',
      'allMessage'
    ])
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
    },
    chatWithFriends: function () {
      console.log('1')
    },
    getMessage: function (userid, otherUserid) {
      console.log('获取聊天信息')
    },
    // 发送消息
    sendMessage: async function () {
      // 发送消息为空的控制
      // if(this.writeMessage.trim() == '') return

      // this.$refs.message.focus()
      // 按钮状态变化
      // this.btnInfo='发送中'
      this.sendBySocket()  // 先通过socket发送消息

      // 持久化到服务器
      let data = {
        userId: this.userId,  // 发送方的id
        otherUserId: this.dataList.userid,  // 接收方的id
        message: this.dialog,  // 消息内容
        time: Date.parse(new Date()) / 1000 // 时间
      }
      const { code, message } = await api.send_message(data)
      if (code == 1) {
        data = {
          type: 'message',
          content: {
            userid: this.userId, // 自己的id
            from: 'me',
            avatar: this.userInfo.avatar,  // 自己的头像
            message: this.dialog, // 发的消息
            time: Date.parse(new Date()) / 1000  // 时间
          }
        }
        // 本地追加自己发送的消息
        this.addMessageLocal(data)
        this.dialog = ''
        // this.btnInfo='发 送'
      } else {
        // 持久化到服务器失败
        this.dataList.message.push({
          type: 'time',
          content: message
        })
        // this.btnInfo='发 送'
      }
    },
    // socket发送消息
    sendBySocket: function () {
      window.socket.emit('sendPrivateMessage', {
        from_user: this.userId,  // 发送方id（即自己的id）
        from_user_face: this.userInfo.avatar, // 发送方头像（即自己的头像）
        from_user_beizhu: this.dataList.beizhu, // 发送方名字（即别人对自己的备注）
        to_user: this.dataList.userid, // 接收方id
        message: this.dialog, // 消息内容
        time: Date.parse(new Date()) / 1000 // 发送时间
      })
    },
    // 本地追加消息
    addMessageLocal: function (data) {
      // 先不考虑时间
      // const message = this.dataList.message // 获取本地已经存在的消息
      // if (message.length == 0) { // 如果本地原来没有消息，则直接添加时间消息，不需要经过比较判断
      //   this.isAddTimeMessage(0, data.content.time)
      // } else {  // 否则需要经过比较判断才能确定是否要添加时间消息
      //   const latestMessage = message[message.length - 1] // 本地最新的一条消息
      //   const latestTime = latestMessage.content.time  // 该消息的时间
      //   this.isAddTimeMessage(1, data.content.time, latestTime)
      // }
      this.dataList.message.push(data)
    },
    // 是否要添加时间消息
    isAddTimeMessage: function (flag, currentTime, prevTime = '') {
      if (flag) {   // 当flag为真时,需要比较判断，才能确定是否要添加时间
        const seprator = 30 * 60   // 时间间隔基准,半个小时
        if (currentTime - prevTime > seprator) { // 当下一条消息和这条消息的时间间隔大于30分钟,才添加时间
          this.dataList.message.push({
            type: 'time',
            content: parseChatTime(currentTime)
          })
        }
      } else {  // 当flag为假时,是必须要添加时间消息的
        this.dataList.message.push({
          type: 'time',
          content: parseChatTime(currentTime)
        })
      }
    }
  },
  mounted () {
    this.dataList.userid = this.$route.params.userid
    console.log(this.dataList.userid)
    // this.resetAndGetUnread(this.dataList.user_id)
    this.getMessage(this.userId, this.dataList.user_id)
    // this.updateBySocket()

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

  .is-right i{
    margin-left: 8px;
    font-size: 20px;
  }
</style>
