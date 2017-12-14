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
      <div v-for="(item, index) in dataList.message" :key="index">
        <template v-if="item.type == 'message'">
          <Dialogue :data="{nickname: dataList.chatWith, avatar: item.content.faceUrl, self: item.content.from == 'me' ? true : false}">
            <p slot="text" v-if="item.content.code !== 308000 && item.content.code !== 302000">{{ item.text || item.content.message }}</p>
            <a :href="item.url ? item.url : ''" slot="url" target="_blank">{{item.content.url ? '链接：' + item.content.url : '' }}</a>
            <ul slot="list" class="list">
              <li v-for="(list, index) in item.content.list" :key="index">
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
        <input @keyup.enter="sendClick" type="text" v-model="dialog" ref="input">
        <button @click="sendClick">{{btnInfo}}</button>
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
const Dialogue = () => import('./Dialogue.vue')

export default {
  name: 'ChatRoom',
  data () {
    return {
      btnInfo: '发送', // 发送按钮文本
      dialog: '',
      dataList: {
        userid: '',   // 别人的id
        chatWith: '可爱小宝宝',  // 自己对别人的备注
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
      'userInfo'
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
        type: 'message',
        content: {
          userid: this.userId, // 自己的id
          from: 'me',
          faceUrl: this.userInfo.avatar,  // 自己的头像
          message: this.dialog // 发的消息
        }
      }
      this.dataList.message.push(data)
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
          type: 'message',
          content: {
            code: res.code,
            userid: 666,
            from: 'other',
            faceUrl: '/static/images/robot.png',
            message: res.text,
            url: res.url ? res.url : '',
            list: res.list ? res.list : []
          }
        }
        this.dataList.message.push(data)
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
    this.dataList.userid = this.$route.params.userid

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
