<template>
    <div id="publish_notice">
      <mt-header fixed title="通知发布" class="header">
        <router-link to="/multifunc/notice" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click="publish">发布</mt-button>
      </mt-header>
      <div class="container">
        <input class="notice-title" type="text" placeholder="标题（必填，15个字以内）" v-model="noticeTitle">
        <textarea class="content" placeholder="公告内容（必填）" v-model="noticeContent">{{noticeContent}}</textarea>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'noticePublish',
    data () {
      return {
        noticeTitle: '',
        noticeContent: ''
      }
    },
    computed: {
      ...mapGetters([
        'classId',
        'publishNoticeStatus'
      ])
    },
    methods: {
      publish: async function () {
        if (!this.noticeTitle || !this.noticeContent) {
          this.$store.dispatch('setShowTips', '通知标题或内容皆不能为空')
          return
        }

        if (this.noticeTitle.length < 5 || this.noticeTitle.length > 15) {
          this.$store.dispatch('setShowTips', '标题的长度在5~15个字之间')
          return
        }
        
        const data = {
          class_id: this.classId,
          notice_title: this.noticeTitle,
          notice_body: this.noticeContent
        }
        await this.$store.dispatch('publishNotice', data)
        
        if (this.publishNoticeStatus) {
          this.$store.dispatch('setShowTips', '发布成功')
        } else {
          this.$store.dispatch('setShowTips', '发布失败')
        }
        // 置空
        this.noticeTitle = ''
        this.noticeContent = ''
        setTimeout(() => {
          history.go(-1)
        }, 2000)
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
    @import url(../../common/styles/base.less);
  
    #publish_notice,
    .container{
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .container {
      background-color: #f8f8f8;
      padding-top: 60px;
    }

    .notice-title {
      width: 100%;
      height: 36px;
      background-color: #fff;
      padding: 0 15px;
    }

    .content {
      width: 100%;
      outline: none;
      background-color: #fff;
      margin-top: 12px;
      line-height: 24px;
      min-height: 192px;
      padding: 12px 15px;
      color: black;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  
  </style>
  