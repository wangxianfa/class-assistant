<template>
  <div id="message">
    <mt-header fixed title="消息" class="header">
      <span class="header-left" slot="left">
        <img :src="this.$store.state.userInfo.avatar" alt="avatar">
      </span>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="container">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <ul>
          <router-link to="/chatrobot" tag="li">
            <span class="left"><img src="/static/images/robot.png" alt="avatar"></span>
            <div class="right">
              <h2>
                <span>机器人小发</span>
                <time></time>
              </h2>
              <div class="content">
                <p>我是人见人爱，花见花谢的小欣</p>
                <mt-badge v-show="false" type="error" size="small">0</mt-badge>
              </div>
            </div>
          </router-link>
          <li v-for="(item, index) in dataList" :key="index" @click="goChat(item.type, item.id)">
            <span class="left"><img :src="item.imgUrl" alt="avatar"></span>
            <div class="right">
              <h2>
                <span>{{item.from_user}}</span>
                <time>{{item.time}}</time>
              </h2>
              <div class="content">
                <p>{{item.last_send_from ? item.last_send_from + '：' + item.message : item.message}}</p>
                <mt-badge v-show="item.unread !== 0" type="error" size="small">{{item.unread}}</mt-badge>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      'userId': 'userId',
      'dataList': 'allMessage',
      'isLogin': 'isLogin'
    })
  },
  created () {
    // 如果不是首次启动,且没有登陆,则跳到登录页面
    !this.isLogin && this.$router.push('/login')
    // 获取消息
    this.$store.dispatch('getAllMessage', this.userId)
    // 新消息通过socket来获取
    this.updateBySocket()
  },
  methods: {
    loadTop: function () {
      // 加载更多数据
      this.$refs.loadmore.onTopLoaded()
    },
    // 通过socket来更新消息
    updateBySocket: function () {
      window.socket.removeAllListeners() // 一定要先移除原来的事件，否则会生成重复的监听器

      window.socket.on('receivePrivateMessage', (data) => {
        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.from_user_beizhu,
          id: data.from_user,
          imgUrl: data.from_user_face,
          message: data.message,
          time: data.time,
          type: 'single',
          isEnterChat: false  // 是否进入了聊天页面，进入了的话那么该条消息的unread就是0
        })
      })
      window.socket.on('receiveGroupMessage', (data) => {
        // console.log(data)
        // 如果不包含自己，则直接丢弃这个socket消息
        if (!data.group_member.includes(this.userId)) return

        this.$store.commit('UPDATE_MESSAGE', {
          from_user: data.group_name,
          id: data.group_id,
          imgUrl: data.group_avator,
          message: data.message,
          time: data.time,
          type: 'group',
          isEnterChat: false
        })
      })
    },
    goChat: function (chatType, chatId) {
      const path = chatType == 'single' ? `/chatone/${chatId}` : `/chatgroup/${chatId}`
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  @avatarSize: 34px;

  #message{
    // padding-top: @headerHeight;
    height: 100%;

    >.container{
      height: calc(~"100% - @{footerHeight}");
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  a{
    text-decoration: none;
  }

  .header-left{
    width: @avatarSize;
    height: @avatarSize;
    display: inline-block;
    &>img{  
      width: @avatarSize;
      height: @avatarSize;
      border-radius: 50%;
    }
  }

  .mint-loadmore{
    height: 100%;
    overflow: initial;
  }

  li{
    @imgSize: 54px;
    @imgMargin: 14px;
    background-color: #fff;

    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    padding: 12px 0;

    &>.left{
      &>img{
        width: @imgSize;
        height: @imgSize;
        border-radius: 50%;
        border: 1px solid #dfdfdf;
        margin: 0 @imgMargin;
      }
    }

    &>.right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: calc(~"100% - @{imgSize} - 2 * @{imgMargin} - 2px"); // 使用calc方法失效， 得到不准确值
      &>h2{
        margin: 0;
        font-size: 17px;
        font-weight: 500;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>time{
          margin-right: 12px;
          font-size: 14px;
          color: #9c9c9c;
        }
      }
      
      &>.content{
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        align-items: center;
        &>p{
          width: calc(~"100% - 50px");
          margin: 0;
          padding: 0;
          overflow: hidden;
          text-overflow: clip;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 14px;
          color: #9c9c9c;
        }
        &>.mint-badge{
          margin-right: 12px;
        }
      }
    }
  }
</style>

