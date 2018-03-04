<template>
  <div class="item">
    <div class="item-header">
      <img :src="classAvatar" alt="avatar">
      <div class="right">
        <p class="name">{{dynamicInfo.className}}</p>
        <time class="time">{{dynamicInfo.dynamicTime}}</time>
      </div>
    </div>

    <div class="item-body">
      <p>{{dynamicInfo.dynamicText}}</p>
      <!-- <div class="imglist">
        <img class="img-item" src="/static/images/class.png" alt="">
        <img class="img-item" src="/static/images/class.png" alt="">
        <img class="img-item" src="/static/images/class.png" alt="">
        <img class="img-item" src="/static/images/class.png" alt="">
      </div> -->
    </div>

    <div class="item-footer">
      <span class="ding">点赞{{dynamicInfo.ding}}次</span>
      <div class="funcbar">
        <i @click="dingClick" :class="['fa', haveDing ? 'fa-thumbs-up' : 'fa-thumbs-o-up', haveDing ? 'active' : '']" aria-hidden="true"></i>
        <!-- <i @click="commentClick" class="fa fa-commenting-o"></i>
        <i @click="shareClick" class="fa fa-share-square-o"></i> -->
      </div>
    </div>

    <div class="comments">
      <ul>
        <!-- <li>
          <p><span class="nickname">小小发一号：</span>哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或</p>
        </li>
        <li>
          <p><span class="nickname">小小发er号：</span>哈哈哈哈哈哈哈哈</p>
        </li> -->
      </ul>
    </div>

    <div v-if="isComment" class="commentBox">
      <input @keyup.enter="uploadComment" @blur="disappearComment" class="comment-input" type="text" placeholder="说点什么吧..." v-model="comment"></input>
    </div>
  </div>
</template>

<script>
import {parseChatTime} from '@/common/js/parse-time'
import { mapGetters } from 'vuex'

export default {
  name: 'Item',
  data () {
    return {
      ding: 0,
      haveDing: false,
      comment: '',
      isComment: false,
      classAvatar: '',
      dynamicInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  props: [
    'dynamic',
    'className',
    'avatar'
  ],
  methods: {
    dingClick: function () {
      // 未赞过
      if (!this.haveDing) {
        this.$store.dispatch('ding', this.dynamicInfo.dynamicId)
      }
    } // ,
    // disappearComment: function () {
    //   this.isComment = false
    // },
    // commentClick: function () {
    //   this.isComment = !this.isComment
    //   console.log('评论一下')
    // },
    // uploadComment: function () {
    //   console.log(this.comment)
    // },
    // commentChange: function (val) {
    //   console.log(val)
    // },
    // shareClick: function () {
    //   console.log('分享')
    // }
  },
  mounted () {
    const dynamicInfo = {
      className: this.$props.className,
      classAvatar: this.$props.avatar,
      dynamicId: this.$props.dynamic.dynamicId,
      dynamicText: this.$props.dynamic.dynamicText,
      dynamicTime: parseChatTime(this.$props.dynamic.dynamicTime),
      ding: this.$props.dynamic.ding,
      dingUser: this.$props.dynamic.dingUser
    }
    
    var userIndex = dynamicInfo.dingUser.indexOf(this.userId)
    if (userIndex >= 0) {
      this.haveDing = true
    } else {
      this.haveDing = false
    }

    this.dynamicInfo = dynamicInfo
    this.classAvatar = this.$props.avatar
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
      
      .imglist {
        margin-top: 10px;
        .img-item {
          width: 32%;
          height: auto;
          padding: 0;
          margin-bottom: 5px;
        }
      }
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
