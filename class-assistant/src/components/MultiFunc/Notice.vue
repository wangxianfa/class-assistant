<template>
  <div id="notice">
    <mt-header fixed title="通知" class="header">
      <router-link to="/?page_name=multifunc" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/multifunc/notice/publish" slot="right">
        <mt-button>{{userInfo.status === 2 ? '通知' : ''}}</mt-button>
      </router-link>
    </mt-header>

    <div class="notice-list">
      <ul>
        <router-link v-for="(item, index) in classNotice" :key="index" tag="li" :to='"/multifunc/notice/" + item.noticeId'>
          <h3 class="title">{{item.noticeTitle}}</h3>
          <time>{{item.noticeTime}}</time>
          <div class="notice-body">{{item.noticeBody}}</div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'notice',
  computed: {
    ...mapGetters([
      'classId',
      'classNotice',
      'userInfo'
    ])
  },
  mounted () {

  },
  created () {
    this.$store.dispatch('getClassNotices', this.classId)
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #notice{
    padding-top: calc(~"@{headerHeight}");
    background-color: #fff;
    height: 100%;
  }

  /* .notice-list::-webkit-scrollbar, 
  ul::-webkit-scrollbar {
    display: none;
  } */

  li {
    border-bottom: 1px solid #f8f8f8;
    margin-bottom: 12px;
    border-top: 1px solid #f8f8f8;
    padding: 12px;
    background-color: rgba(235, 237, 244, 0.4);
    font-size: 13px;
    
    time {
      font-size: 12px;
      color: rgb(170, 184, 163);
    }

    .notice-body {
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid #dfdfdf;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

  }

</style>
