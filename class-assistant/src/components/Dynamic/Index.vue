<template>
  <div id="dynamic">
    <mt-header fixed title="班级动态" class="header"></mt-header>
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

      <p>{{classMessage.dynamics.length === 0 ? '暂无班级动态' : ''}}</p>

    </div>
  </div>
</template>

<script>

import Item from './Item.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dynamic',
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

  #dynamic,
  .container{
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .container{
    padding-bottom: calc(~"@{footerHeight}");
  }

</style>
