<template>
    <div id="notice-detail">
      <mt-header fixed title="通知详情" class="header">
        <router-link to="/multifunc/notice" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
  
      <div class="notice">
        <h3 class="title">{{noticeDetail.noticeTitle}}</h3>
        <time>{{noticeDetail.noticeTime}}</time>
        <div class="notice-body">{{noticeDetail.noticeBody}}</div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'noticeDetail',
    computed: {
      ...mapGetters([
        'noticeDetail'
      ])
    },
    created () {
      this.$store.dispatch('getNoticeDetail', this.$route.params.noticeId)
    }
  }
  </script>
  
  <style lang="less" scoped>
    @import url(../../common/styles/base.less);
  
    #notice-detail{
      padding-top: calc(~"@{headerHeight}");
      background-color: #fff;
      height: 100%;
    }
  
    /* .notice-list::-webkit-scrollbar, 
    ul::-webkit-scrollbar {
      display: none;
    } */
  
    .notice {
      border-bottom: 1px solid #f8f8f8;
      margin-bottom: 12px;
      border-top: 1px solid #f8f8f8;
      padding: 12px;
      background-color: #fff;
      font-size: 14px;
      
      time {
        display: inline-block;
        font-size: 12px;
        color: rgb(170, 184, 163);
        margin-top: 4px;
      }
  
      .notice-body {
        margin-top: 6px;
        padding-top: 12px;
        border-top: 1px solid #dfdfdf;
      }
  
    }
  
  </style>  