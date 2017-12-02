<template>
  <div id="chatroom">
    <mt-header fixed :title="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <i class="fa fa-users" slot="right"></i>
    </mt-header>

    <div class="msgwrap" ref="msgwrap">
      <div class="dialog"  v-for="(item, index) in items" :key="index">
        <span class="avatar"><img :src="item.from_user_avatar" alt="robot"></span>
        <div class="dialog-msg">
          <p class="nickname">{{item.from_user_nick_name}}</p>
          <div class="msg">
            <p>{{item.message}}</p>
            <span class="angle"></span>
          </div>
        </div>
      </div>

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
    chatting: function (message) {
      window.socket.emit('groupMessage', message)
      // console.log(socket)
    }
  },
  mounted () {
    this.header = this.$route.params.header
    this.avatar = this.$route.params.avatar
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

  .dialog{

    display: flex;
    margin-top: 24px;
    margin-left: 14px;

    >.avatar>img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    >.dialog-msg{
      @dialog-bgc: #575757;
      @fontColor: #fff;
      width: calc(~"100% - 70px");
      margin-left: 15px;

      >.nickname{
        font-size: 12px;
        color: @dialog-bgc;
        // margin-left: 4px;
        color: #9966CC;
      }

      >.msg {
        padding: 6px 10px 6px 10px;
        background-color: @dialog-bgc;
        min-width: 40px;
        max-width: 84%;
        min-height: 36px;
        border-radius: 10px;
        font-size: 14px;
        color: #666;
        position: relative;
        margin-top: 6px;
        line-height: 24px;
        display: inline-block;
        text-align: center;

        p{
          display: inline-block;
          text-align: left;
          color: @fontColor;
        }

        >a{
          display: block;
          word-wrap:break-word;
          text-align: left;
        }

        .list{

          >li{
            margin-top: 20px;

            >h2{
              font-size: 15px;
              font-weight: bold;
              text-align: left;
            }
            >p{
              text-align: left;
              width: 100%;
              color: #999;
              font-size: 13px;
            }
            >img{
              width: 100%;
              border-radius: 8px;
              margin: 6px 0;
            }

            img[lazy=loading] {
              width: 100%;
              height: 152px;
              margin: 6px 0;
            }

            >a{
              display: block;
              word-wrap:break-word;
              text-align: left;
            }
          }

          >li:nth-of-type(1){
            margin-top: 10px;
          }
        }

        >.angle{
          width: 0;
          height: 0;
          // border-top-color: #ccFF99;
          // border-right-color: #ff0099;
          // border-bottom-color: #00ff99;
          // border-left-color: #9900ff;
          border-style: solid;
          position: absolute;
          border-color: transparent transparent transparent @dialog-bgc;
          border-width: 13px 20px 20px 10px;
          left: -10px;
          top: 4px;
          transform-origin: left top;
          transform: rotateZ(-26.5deg);
        }

      }
    }
  }

</style>
