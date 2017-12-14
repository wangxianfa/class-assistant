<template>
  <div class="item" @click="goChat(chatType, sid)">
    <span class="avatar">
      <img :src="avatar" alt="avatar">
    </span>
    <div class="right">
      <h2 class="nickname">{{nickname}}</h2>
      <p class="detail">{{detail}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      sid: null,
      avatar: '',
      nickname: '',
      detail: '',
      chatType: ''
    }
  },
  props: ['data'],
  mounted () {
    this.sid = this.$props.data.sid
    this.avatar = this.$props.data.avatar
    this.nickname = this.$props.data.nickname
    this.detail = this.$props.data.detail
    this.chatType = this.$props.data.chatType
  },
  methods: {
    goChat: function (chatType, chatId) {
      const path = chatType == 'single' ? `/chatone/${chatId}` : `/chatgroup/${chatId}`
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
  .item{
    display: flex;
    padding: 10px;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f8f8f8;
    height: 64px;

    >.avatar{
      margin-right: 10px;
      img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }

    >.right{
      width: calc(~"100% - 46px");

      h2{
        font-size: 14px;
        color: 333;
      }
      .detail{
        font-size: 13px;
        color: #999;
      }
    }
  }
</style>
