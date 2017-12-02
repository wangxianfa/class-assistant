<template>
  <div class="item">
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
      avatar: '',
      nickname: '',
      detail: ''
    }
  },
  props: ['data'],
  mounted () {
    this.avatar = this.$props.data.avatar
    this.nickname = this.$props.data.nickname
    this.detail = this.$props.data.detail
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
