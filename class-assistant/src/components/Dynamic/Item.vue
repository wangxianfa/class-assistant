<template>
  <div class="item">
    <div class="item-header">
      <img src="/static/images/1.png" alt="avatar">
      <div class="right">
        <p class="name">小小发</p>
        <time class="time">今天16:32</time>
      </div>
    </div>

    <div class="item-body">
      <p>前不久看到。看到标题的时候，我感到非常好奇。我知道虽然在异步程序中可以不使用配合来处理错误，但是处理方式并不能与配合得很好，所以很想知道到底有什么办法会比更好用。</p>
    </div>

    <div class="item-footer">
      <span class="ding">点赞91次</span>
      <div class="funcbar">
        <i @click="dingClick" class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        <i @click="commentClick" class="fa fa-commenting-o"></i>
        <i @click="shareClick" class="fa fa-share-square-o"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  methods: {
    dingClick: function () {
      console.log('赞一下')
    },
    commentClick: function () {
      console.log('评论一下')
    },
    shareClick: function () {
      console.log('分享')
    }
  }
}
</script>

<style lang="less" scoped>

  .item{
    padding: 15px 0;
    background-color: #fff;
    margin-bottom: 24px;

    &>.item-header{
      display: flex;
      align-items: center;
      img{
        width: 54px;
        height: 54px;
        border-radius: 50%;
        margin: 0 12px;
      }

      &>.right{
        p{
          font-weight: 500;
          font-size: 15px;
          color: #000000;
        }
        .time{
          font-size: 13px;
          font-weight: 300;
          color: #999;
          margin-top: 5px;
          display: inline-block;
        }
      }
    }

    &>.item-body{
      padding: 0 12px;
      font-size: 16px;
      color: #333;
      font-weight: 500;
      margin-top: 12px;
    }

    &>.item-footer{
      display: flex;
      justify-content: space-between;
      padding: 0 12px;
      margin-top: 16px;

      .ding{
        font-size: 14px;
        color: #999;
        display: inline-block;
      }

      i{
        color: #666;
        font-size: 20px !important;
        margin: 0 10px;
      }
    }
  }

</style>
