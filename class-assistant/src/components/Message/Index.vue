<template>
  <div id="message">
    <mt-header fixed title="消息" class="header">
      <span class="header-left" slot="left">
        <img :src="this.$store.state.userInfo.avatar" alt="avatar">
      </span>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul>
        <router-link v-for="(item, index) in list"  :to="{name: 'chatOne', params: {userid: 1, header: item.header, avatar: item.avatar}}" tag="li" :key="index">
          <!-- <li v-for="(item, index) in list" :key="index"> -->
          <span class="left"><img :src="item.avatar" alt="avatar"></span>
          <div class="right">
            <h2>
              <span>{{item.header}}</span>
              <time>{{item.latestTime}}</time>
            </h2>
            <div class="content">
              <p>{{item.latestMsg}}</p>
              <mt-badge v-show="item.unread !== 0" type="error" size="small">{{item.unread}}</mt-badge>
            </div>
          </div>
          <!-- </li> -->
        </router-link>
        {{userId}}
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      list: [
        {
          roomid: 1,
          header: '机器人小欣',
          avatar: '/static/images/robot.png',
          latestMsg: '哈喽，你好！我是机器人小欣❥(^_-)',
          latestTime: '9:42',
          unread: 0
        },
        {
          roomid: 2,
          header: '腾讯新闻',
          avatar: '/static/images/tengxun.png',
          latestMsg: '渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。',
          latestTime: '19:12',
          unread: 12
        },
        {
          roomid: 3,
          header: '小小发',
          avatar: '/static/images/1.png',
          latestMsg: '渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。',
          latestTime: '22:52',
          unread: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      'userId': 'userId',
      'dataList': 'allMessage',
      'isLogin': 'isLogin'
    })
  },
  created () {
    // 如果不是首次启动,且没有登陆,则跳到登录页面
    console.log(this.isLogin)
    !this.isLogin && this.$router.push('/login')
    console.log(this.$store.state.userInfo.avatar)
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
        console.log('接收到私聊消息：' + data)
      })
      window.socket.on('receiveGroupMessage', (data) => {
        // 如果不包含自己，则直接丢弃这个socket消息
        console.log('接收到群发消息, 消息为：' + data.message)
        // console.log(this.$router)
        // this.$router.push(`/chatgroup/${data.group_id}`)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  @avatarSize: 34px;

  #message{
    // padding-top: @headerHeight;
    min-height: 100%;
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

