<template>
  <div id="chatroom">
    <mt-header fixed :title="dataList.groupName">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link :to="/grouphomepage/ + this.$route.params.groupid" class="fa fa-users" slot="right" tag="i"></router-link>
    </mt-header>

    <div class="msgwrap" ref="msgwrap">
      <div v-for="(item, index) in dataList.message" :key="index">
        <template v-if="item.type == 'message'">
          <Dialogue :data="{nickname: item.content.name, avatar: item.content.face, self: item.content.from !== 'me' ? true : false, showNickname: true}">
            <p slot="text">{{ item.text || item.content.message }}</p>
          </Dialogue>
        </template>
        <template v-else>
          <span class="time">{{item.content}}</span>
        </template>
      </div>
    </div>

    <div id="bottomZone">
      <div class="inputBox">
        <input @keyup.enter="sendMessage" type="text" v-model="writeMessage" ref="message">
        <button @click="sendMessage">{{btnInfo}}</button>
      </div>
      <div class="funcbar">
        <i class="fa fa-microphone" @click="microphoneClick"></i>
        <i class="fa fa-photo" @click="photoClick"></i>
        <i class="fa fa-camera" @click="cameraClick"></i>
        <i class="fa fa-money" @click="bonusClick"></i>
        <i class="fa fa-video-camera" @click="videoClick"></i>
        <i class="fa fa-smile-o" @click="smileClick"></i>
        <i class="fa fa-plus-circle" @click="otherClick"></i>
      </div>
    </div>
  </div>
</template>

<script>

// import axios from 'axios'
import { parseChatTime } from '@/common/js/parse-time'
import * as api from '@/api/chatGroup'
import { mapGetters } from 'vuex'
const Dialogue = () => import('./Dialogue.vue')

export default {
  name: 'ChatRoom',
  data () {
    return {
      writeMessage: '',  // 要发送的消息
      unread: 0,
      dataList: {
        groupId: '',  // 群id
        groupName: '正在加载中...',  // 群名称
        groupAvator: '',  // 群头像
        groupMember: [],  // 其它群成员的id（方便socket給指定群成员发送消息）
        nick_name: '',  // 自己的群昵称
        message: []  // 拉取到的消息
      },
      btnInfo: '发送'
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
        group_id: '2014',  // 群id
        group_name: '毕业设计（2018）', // 群名称
        group_avator: '/images/static/robot.png',  // 群头像
        group_member: [], // 所有群成员的id,方便socket判断
        from_user_id: '201421092075',   // 自己的id
        from_user_nick_name: '小小发',  // 自己的群昵称
        from_user_avatar: '/static/images/1.png',   // 自己的头像
        message: this.dialog,  // 消息内容
        time: Date.parse(new Date()) / 1000  // 时间
      }

      this.items.push(data)
      this.chatting(data)
    },
    changeHeight: function () {
      // console.log('scrollTop: ' + this.$refs.msgwrap.scrollTop)
      // console.log('scrollHeight: ' + this.$refs.msgwrap.scrollHeight)
      this.$refs.msgwrap.scrollTop = this.$refs.msgwrap.scrollHeight
    },
    // 将该群的未读消息数置0,并拉取未读消息条数
    resetAndGetUnread: function (id) {
      this.$store.commit('UPDATE_UNREAD_MESSAGE', {
        type: 'group',
        id
      })
      this.getUnread()
    },
    // 获取未读消息数
    getUnread: function () {
      let unread = 0
      this.allMessage.forEach(item => {
        unread += item.unread
      })
      this.unread = unread
    },
    // 获取群消息
    getMessage: async function (userId, groupId) {
      const {data} = await api.get_message(userId, groupId)
      const {info, message, groupMember} = data
      this.dataList.groupId = info.id  // 群id
      this.dataList.groupAvator = info.group_avator   // 群头像
      this.dataList.groupName = info.group_name   // 群名称
      this.dataList.nick_name = info.nick_name  // 自己的群昵称
      this.dataList.groupMember = groupMember  // 其它群成员的id

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
            user_id: value.from_user,  // 发送方的id
            from: value.from_user == this.userId ? 'me' : 'other',
            face: value.avatar, // 发送方的头像
            name: value.nick_name,  // 发送方的群昵称
            message: value.message.substr(value.message.indexOf(':') + 1), // 发送方的消息
            time: value.time // 发送方的发送时间
          } 
        }
        this.dataList.message.push(content)
      }
    },
    // 发送消息
    sendMessage: async function () {
      if (this.writeMessage.trim() == '') return

      this.$refs.message.focus()
      this.btnInfo = '发送中'

      this.sendBySocket()  // 先通过socket发送消息
    
      // 持久化到服务器
      let data = {
        userId: this.userId, // 发送方的id
        groupId: this.dataList.groupId, // 群id
        message: this.writeMessage,  // 消息内容
        nickName: this.dataList.nick_name, // 用户的群昵称
        time: new Date().getTime() // 时间
      }
      const {code} = await api.send_message(data)
      if (code == 1) {  // 如果发送成功了
        data = {
          type: 'message',
          content: {
            user_id: this.userId,  // 用户的id
            from: 'me',
            name: this.dataList.nick_name,  // 用户的群昵称
            face: this.userInfo.avatar,   // 用户的头像
            message: this.writeMessage,  // 发送的消息
            time: Date.parse(new Date()) / 1000 // 发送时间
          } 
        }
        // 本地追加自己发送的消息
        this.addMessageLocal(data)
        this.writeMessage = ''
        this.btnInfo = '发送'
      }
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
    },
    // socket发送消息
    sendBySocket: function () {
      window.socket.emit('sendGroupMessage', {
        group_id: this.dataList.groupId,  // 群id
        group_name: this.dataList.groupName, // 群名称
        group_avator: this.dataList.groupAvator,  // 群头像
        group_member: this.dataList.groupMember, // 所有群成员的id,方便socket判断
        from_user_id: this.userId,   // 自己的id
        from_user_nick_name: this.dataList.nick_name,  // 自己的群昵称
        from_user_face: this.userInfo.avatar,   // 自己的头像
        message: this.writeMessage,  // 消息内容
        time: new Date().getTime()  // 时间
      })
    },
    // socket更新消息
    updateBySocket: function () {
      window.socket.removeAllListeners()  // 一定要先移除原来的事件，否则会有重复的监听器
      
      window.socket.on('receiveGroupMessage', (data) => {
        // 如果不包含自己，则直接丢弃这个socket消息
        if (!data.group_member.includes(this.userId)) return
        
        // 是否发送到本群
        if (this.dataList.groupId == data.group_id) {
          // 本地追加别人通过socket发来的消息
          this.addMessageLocal({
            type: 'message',
            content: {
              user_id: data.from_user_id,  // 发送方的id(群id)
              from: 'other',  // 是别人发送的
              name: data.from_user_nick_name, // 发送方的群昵称
              face: data.from_user_face, //  发送方的头像
              message: data.message, // 发送的消息
              time: data.time  // 发送方的发送时间
            } 
          })
        }
        
        // 提交到store里
        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.group_name,
          id: data.group_id,
          imgUrl: data.group_avator,
          message: `${data.from_user_nick_name}: ${data.message}`,
          time: data.time,
          type: 'group',
          isEnterChat: this.dataList.groupId == data.group_id
        })
      })

      window.socket.on('receivePrivateMessage', (data) => {
        // 提交到store里
        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.from_user_beizhu,
          id: data.from_user,
          imgUrl: data.from_user_face,
          message: data.message,
          time: data.time,
          type: 'single',
          isEnterChat: false
        })
      })
    }
  },
  mounted () {
    this.dataList.groupId = this.$route.params.groupid  // 群id
    this.resetAndGetUnread(this.dataList.groupId)
    this.getMessage(this.userId, this.dataList.groupId)  // 拉取群聊天消息
    this.updateBySocket()  // 通过socket来更新消息
  },
  components: {
    Dialogue
  },
  watch: {
    'dataList.message': function () {
      // 初始化时消息列表到最下面
      this.changeHeight()
      this.$nextTick(() => {
        // 聊天时消息列表到最下面
        this.changeHeight()
      })
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'userInfo',
      'allMessage'
    ])
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

    &::-webkit-scrollbar {
      display: none;
    }

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
      width: 64px;
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
    font-size: 18px;
  }

</style>
