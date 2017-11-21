<template>
  <div id="dynamic">
    <mt-header fixed title="动态" class="header"></mt-header>
    <div class="container">

      <mt-loadmore 
      :top-method="loadTop" 
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded" 
      :bottomDistance="100"
      :auto-fill="false"
      @top-status-change="handleTopChange"
      @bottom-status-change="handleBottomChange"
      ref="loadmore">
        <ul>
          <li v-for="item in items" :key="item">
            <item></item>
          </li>
        </ul>

        <div slot="top" class="mint-loadmore-top">
          <!-- <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span> -->
          <span v-show="topStatus === 'pull'">下拉刷新↓</span>
          <span v-show="topStatus === 'drop'">释放立即刷新↑</span>
          <span v-show="topStatus === 'loading'">loading...</span>
        </div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <!-- <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span> -->
          <span v-show="bottomStatus === 'pull'">上拉加载↑</span>
          <span v-show="bottomStatus === 'drop'">释放立即加载↓</span>
          <span v-show="bottomStatus === 'loading'">loading...</span>
        </div>

      </mt-loadmore>

    </div>
  </div>
</template>

<script>

import Item from './Item.vue'

export default {
  name: 'Dynamic',
  data () {
    return {
      allLoaded: false,
      items: [1, 2],
      topStatus: '',
      bottomStatus: ''
    }
  },
  methods: {
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom: function () {
      // this.allLoaded = true
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
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  .container {
    padding-top: calc(~"@{headerHeight}");
    margin-bottom: 55px;
    // -webkit-overflow-scrolling: auto;
    // overflow-y: scroll;
  }

</style>
