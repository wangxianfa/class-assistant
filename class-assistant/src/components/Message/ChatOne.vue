<template>
  <div id="chatroom">
    <mt-header fixed :title="dataList.chatWith">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <span slot="right">
        <i class="fa fa-phone" aria-hidden="true"></i>
        <router-link class="fa fa-user" :to="/personalhomepage/ + userId" tag="i"></router-link>
      </span>
    </mt-header>

    <div class="msgwrap" ref="msgwrap">
      <div v-for="(item, index) in dataList.message" :key="index">
        <template v-if="item.type == 'message'">
          <Dialogue :data="{nickname: dataList.chatWith, avatar: item.content.faceUrl, self: item.content.from == 'me' ? true : false}">
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
        </template>

        <template v-else>
          <span class="time">{{item.content}}</span>
        </template>
      </div>
    </div>

    <div id="bottomZone">
      <div class="inputBox">
        <input @keyup.enter="sendMessage" type="text" v-model="dialog" ref="input">
        <button @click="sendMessage">{{btnInfo}}</button>
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
      btnInfo: '发送', // 发送按钮文本
      dialog: '',
      unread: 0,
      dataList: {
        userid: '',   // 别人的id
        chatWith: '正在加载中...',  // 自己对别人的备注
        avatar: '',  // 别人的头像
        beizhu: '',  // 别人对自己的备注
        message: [ ],  // 消息
        status: '' // 登录设备类型
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
    // 获取消息
    getMessage: async function (userId, otherUserId) {
      const {data} = await api.get_message(userId, otherUserId)
      const {info, info1, message} = data
      const {device = 1, beizhu, avatar} = info  // 别人的信息
      this.dataList.status = device == 0 ? '离线' : device == 1 ? '手机在线' : device == 2 ? '3G在线' : device == 3 ? '4G在线' : device == 4 ? 'WiFi在线' : '电脑在线'
      this.dataList.chatWith = beizhu  // 自己对别人的备注
      this.dataList.beizhu = info1.beizhu  // 别人对自己的备注
      this.dataList.avatar = avatar  // 别人的头像

      // 取消息
      if (message.length == 0) return

      // 添加第一条时间消息，不需要经过判断
      this.isAddTimeMessage(0, message[0].time)
      // 添加消息内容
      for (let [index, value] of message.entries()) {
        // 需要通过判断才能确定是否要添加时间消息
        index > 0 && this.isAddTimeMessage(1, value.time, message[index - 1].time)
        let content = {
          type: 'message',
          content: {
            user_id: value.from_user, // 发送方的id
            from: value.from_user == this.userId ? 'me' : 'other',
            faceUrl: value.avatar,  // 发送方的头像
            message: value.message, // 发送方的消息
            time: value.time // 发送方的发送时间
          }
        }
        this.dataList.message.push(content)
      }
    },
    // 发送消息
    sendMessage: async function () {
      // 发送消息为空的控制
      if (this.dialog.trim() == '') return

      this.$refs.input.focus()
      // 按钮状态变化
      this.btnInfo = '发送中'
      this.sendBySocket()  // 先通过socket发送消息

      // 持久化到服务器
      let data = {
        userId: this.userId,  // 发送方的id
        otherUserId: this.dataList.userid,  // 接收方的id
        message: this.dialog,  // 消息内容
        time: new Date().getTime() // 时间
      }
      const { code, message } = await api.send_message(data)
      if (code == 1) {
        data = {
          type: 'message',
          content: {
            userid: this.userId, // 自己的id
            from: 'me',
            faceUrl: this.userInfo.avatar,  // 自己的头像
            message: this.dialog, // 发的消息
            time: new Date().getTime()  // 时间
          }
        }
        // 本地追加自己发送的消息
        this.addMessageLocal(data)
        this.dialog = ''
        this.btnInfo = '发送'
      } else {
        // 持久化到服务器失败
        this.dataList.message.push({
          type: 'time',
          content: message
        })
        this.btnInfo = '发送'
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
        time: new Date().getTime() // 发送时间
      })
    },
    // socket更新消息
    updateBySocket: function () {
      window.socket.removeAllListeners()  // 一定要先移除原来的事件，否则会有重复的监听器

      window.socket.on('receivePrivateMessage', (data) => {
        if (data.from_user == this.userId) return

        if (this.dataList.userid == data.from_user) {
          // 本地追加别人通过socket发来的消息
          this.addMessageLocal({
            type: 'message',
            content: {
              user_id: data.from_user, // 发送方id
              from: 'other',
              time: data.time, // 发送时间
              faceUrl: data.from_user_face, // 发送方的头像
              message: data.message  // 消息内容
            }
          })
        }

        // 提交到store里
        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.from_user_beizhu,
          id: data.from_user,
          imgUrl: data.from_user_face,
          message: data.message,
          time: data.time,
          type: 'single',
          isEnterChat: this.dataList.user_id == data.from_user  // 是否进入了聊天页面，进入了的话那么该条消息的unread就是0
        })
      })

      window.socket.on('receiveGroupMessage', (data) => {
        // 如果不包含自己，则直接丢弃这个socket消息
        if (!data.group_member.includes(this.userId - 0)) return

        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.group_name,
          id: data.group_id,
          imgUrl: data.group_avator,
          message: `${data.from_user_nick_name} : ${data.message}`,
          time: data.time,
          type: 'group',
          isEnterChat: false
        })
      })
    },
    // 本地追加消息
    addMessageLocal: function (data) {
      const message = this.dataList.message // 获取本地已经存在的消息
      if (message.length == 0) { // 如果本地原来没有消息，则直接添加时间消息，不需要经过比较判断
        this.isAddTimeMessage(0, data.content.time)
      } else {  // 否则需要经过比较判断才能确定是否要添加时间消息
        const latestMessage = message[message.length - 1] // 本地最新的一条消息
        const latestTime = latestMessage.content.time  // 该消息的时间
        this.isAddTimeMessage(1, data.content.time, latestTime)
      }
      this.dataList.message.push(data)
    },
    // 是否要添加时间消息
    isAddTimeMessage: function (flag, currentTime, prevTime = '') {
      if (flag) {   // 当flag为真时,需要比较判断，才能确定是否要添加时间
        const seprator = 30 * 60   // 时间间隔基准,半个小时
        if (currentTime - prevTime > seprator * 1000) { // 当下一条消息和这条消息的时间间隔大于30分钟,才添加时间
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
    // this.resetAndGetUnread(this.dataList.userid)
    this.getMessage(this.userId, this.dataList.userid)
    this.updateBySocket()

    this.$refs.msgwrap.addEventListener('resize', this.changeHeight)
  },
  components: {
    Dialogue
  },
  watch: {
    'dataList.message': function () {
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

    .time{
      display: inline-block;
      width: 100%;
      height:42px;
      line-height:42px;
      font-size:14px;
      color:#666;
      text-align:center;
      // margin-bottom: -15px;
    }

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
      min-width: 64px;
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
