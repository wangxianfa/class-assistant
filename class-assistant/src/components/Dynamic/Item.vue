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
      <h3>
        <span>事件标签: </span>
        <em v-for="(tag, index) in dynamicInfo.tags" :key="'tag' + index">{{tag}}</em>
      </h3>
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
      'userId',
      'dingStatus'
    ])
  },
  props: [
    'dynamic',
    'className',
    'avatar'
  ],
  methods: {
    dingClick: async function () {
      // 未赞过
      if (!this.haveDing) {
        const opts = {
          dynamicId: this.dynamicInfo.dynamicId, 
          userId: this.userId
        }
        await this.$store.dispatch('ding', opts)
        if (this.dingStatus) {
          this.haveDing = true
          this.dynamicInfo.ding++
          this.$store.dispatch('setShowTips', '点赞成功')
        } else {
          this.$store.dispatch('setShowTips', '点赞失败')
        }
      } else {
        this.$store.dispatch('setShowTips', '你已经点过赞了')
      }
    },

    changeState: function () {
      const dynamicInfo = {
        className: this.$props.className,
        classAvatar: this.$props.avatar,
        dynamicId: this.$props.dynamic.dynamicId,
        dynamicText: this.$props.dynamic.dynamicText,
        dynamicTime: this.$props.dynamic.dynamicTime,
        ding: this.$props.dynamic.ding,
        dingUser: this.$props.dynamic.dingUser,
        tags: this.$props.dynamic.tags
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
    this.changeState()
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
      h3 {
        font-size: 15px;
        margin-bottom: 6px;
      }

      em {
        display: inline-block;
        background-color: rgb(153, 102, 204, 0.8);
        margin-right: 10px;
        font-style: normal;
        padding: 0 8px;
        font-size: 12px;
        border-radius: 100%;
        color: #fff;
        font-weight: bold;
        line-height: 24px;
      }

      em:nth-of-type(2n) {
        background-color: rgb(237, 208, 190, 0.8);
      }

      em:nth-last-of-type(3n) {
        background-color: rgb(37, 198, 252, 0.8);
      }

      em:nth-last-of-type(4n) {
        background-color: rgb(0, 255, 128, 0.8);
      }

      padding: 0 12px;
      font-size: 14px;
      color: #333;
      font-weight: 500;
      margin-top: 12px;
      
      /* 暂定全部显示 */
      /* p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      } */
      
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
