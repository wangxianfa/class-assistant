<template>
  <div class="item">
    <div class="item-header">
      <img src="/static/images/1.png" alt="avatar">
      <div class="right">
        <p class="name">软工四班</p>
        <time class="time">今天16:32</time>
      </div>
    </div>

    <div class="item-body">
      <p>前不久看到。看到标题的时候，我感到非常好奇。我知道虽然在异步程序中可以不使用配合来处理错误，但是处理方式并不能与配合得很好，所以很想知道到底有什么办法会比更好用。</p>
    </div>

    <div class="item-footer">
      <span class="ding">点赞{{ding}}次</span>
      <div class="funcbar">
        <i @click="dingClick" :class="['fa', haveDing ? 'fa-thumbs-up' : 'fa-thumbs-o-up', haveDing ? 'active' : '']" aria-hidden="true"></i>
        <i @click="commentClick" class="fa fa-commenting-o"></i>
        <i @click="shareClick" class="fa fa-share-square-o"></i>
      </div>
    </div>

    <div class="comments">
      <ul>
        <li>
          <p><span class="nickname">小小发一号：</span>哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</p>
        </li>
        <li>
          <p><span class="nickname">小小发er号：</span>哈哈哈哈哈哈哈哈</p>
        </li>
      </ul>
    </div>

    <div v-if="isComment" class="commentBox">
      <input @keyup.enter="uploadComment" @blur="disappearComment" class="comment-input" type="text" placeholder="说点什么吧..." v-model="comment"></input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {
      ding: 0,
      haveDing: false,
      comment: '',
      isComment: false
    }
  },
  methods: {
    dingClick: function () {
      this.haveDing ? this.ding-- : this.ding++
      this.haveDing = !this.haveDing
      console.log('赞一下')
    },
    disappearComment: function () {
      this.isComment = false
    },
    commentClick: function () {
      this.isComment = !this.isComment
      console.log('评论一下')
    },
    uploadComment: function () {
      console.log(this.comment)
    },
    commentChange: function (val) {
      console.log(val)
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
      font-size: 15px;
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

      i.active{
        color: #26a2ff;
      }
    }

    &>.comments{
      padding: 0 12px;
      margin-top: 6px;
      font-size: 13px;

      span{
        color: #6C890B;
      }

    }

    &>.commentBox{
      padding: 0 12px;
      margin-top: 12px;

      &>.comment-input{
        border: 1px solid #dfdfdf;
        width: 100%;
        border-radius: 5px;
        min-height: 32px;
        line-height: 20px;
        padding: 0 6px;
      }
    }
  }

</style>
