<template>
  <div id="dynamic">
    <mt-header fixed title="班级动态" class="header">
      <router-link to="/dynamic/publish" slot="right">
        <mt-button>{{userInfo.status === 2 ? '添加' : ''}}</mt-button>
      </router-link>
    </mt-header>
    <div class="container">

      <mt-loadmore 
      :top-method="loadTop" 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      :bottomDistance="70"
      :auto-fill="true"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
        <ul>
          <li v-for="dynamicItem in classMessage.dynamics" :key="JSON.stringify(dynamicItem)">
            <Item :dynamic="dynamicItem" :className="classMessage.className" :avatar="classMessage.classAvatar"/>
          </li>
        </ul>

        <div slot="top" class="mint-loadmore-top">
          <!-- <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span> -->
          <span v-show="topStatus === 'pull'">下拉刷新↓</span>
          <span v-show="topStatus === 'drop'">释放立即刷新↑</span>
          <span v-show="topStatus === 'loading'">刷新中...</span>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <!-- <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span> -->
          <span v-show="bottomStatus === 'pull'">上拉加载↑</span>
          <span v-show="bottomStatus === 'drop'">释放立即加载↓</span>
          <span v-show="bottomStatus === 'loading'">加载中...</span>
        </div>

      </mt-loadmore>

      <div class="no-dynamic">
        <figure v-if="classMessage.dynamics.length === 0">
          <img src="/static/images/add-list/5.png" />
          <p>暂无班级动态~~</p>
        </figure>
      </div>

    </div>
  </div>
</template>

<script>

import Item from './Item.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'dynamic',
  data () {
    return {
      allLoaded: false,
      items: [],
      topStatus: '',
      bottomStatus: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'classId',
      'classMessage'
    ])
  },
  methods: {
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom: function () {
      this.allLoaded = false
      /**
       * 上拉加载首屏高度不得超过屏幕高度，否则上拉加载会失效
       */
      this.$refs.loadmore.onBottomLoaded()
    },
    handleTopChange: function (status) {
      this.topStatus = status
    },
    handleBottomChange: function (status) {
      this.bottomStatus = status
    }
  },
  components: {
    Item
  },
  created () {
    this.$store.dispatch('getClassMessage', this.classId)
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  header {
    a {
      color: #fff;
    }
  }

  #dynamic,
  .container{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .container{
    padding-bottom: calc(~"@{footerHeight}");
  }

  .mint-loadmore, .container {
    &::-webkit-scrollbar {
      display: none
    }
  }
  figure {
    text-align: center;
    margin: 50px 0 0;
    >img{
      width: 60%;
      height: auto;
    }
    >p{
      margin-top: 12px;
      color: #BDBDBD;
      font-weight: bold;
      font-size: 16px;
    }
  }
</style>
