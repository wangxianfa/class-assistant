<template>
  <div id="container">
    <mt-tab-container v-model="tabSelected">
      <mt-tab-container-item id="tab-container1">
        <message />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <dynamic />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <multi-func />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container4">
        <add-list />
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container5">
        <mine />
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar fixed v-model="selected">
      <mt-tab-item @click.native="itemClick(0)" id="消息">
        <i slot="icon" :class="['fa', actived[0] ? 'fa-commenting' : 'fa-commenting-o']" aria-hidden="true"></i>
        消息
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(1)" id="动态">
        <i slot="icon" :class="['fa', actived[1] ? 'fa-star' : 'fa-star-o']" aria-hidden="true"></i>
        动态
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(2)" id="功能区">
        <i slot="icon" :class="['fa', actived[2] ? 'fa-circle' : 'fa-circle-o']" aria-hidden="true"></i>
        功能区
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(3)" id="通讯录">
        <i slot="icon" :class="['fa', actived[3] ? 'fa-address-card' : 'fa-address-card-o']" aria-hidden="true"></i>
        联系人
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(4)" id="我的">
        <i slot="icon" :class="['fa', actived[4] ? 'fa-user-circle' : 'fa-user-circle-o']" aria-hidden="true"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

import { replaceParamVal } from '@/common/js/url.js'
const Message = () => import('./Message/Index.vue')
const Dynamic = () => import('./Dynamic/Index.vue')
const MultiFunc = () => import('./MultiFunc/Index.vue')
const AddList = () => import('./AddList/Index.vue')
const Mine = () => import('./Mine/Index.vue')

export default {
  name: 'Main',
  data () {
    return {
      selected: '消息',
      actived: [true, false, false, false, false],
      bottomTab: ['消息', '动态', '功能区', '通讯录', '我的']
    }
  },
  methods: {
    itemClick: function (selected) {
      var replaceWith
      switch (selected) {
        case 0:
          replaceWith = 'message'
          break
        case 1:
          replaceWith = 'dynamic'
          break
        case 2:
          replaceWith = 'multifunc'
          break
        case 3:
          replaceWith = 'addlist'
          break
        case 4:
          replaceWith = 'mine'
          break
      }
      replaceParamVal('page_name', replaceWith)
    },
    changeQuery: function () {
      let selected = this.selected
      const route = this.$route
      switch (route.query.page_name) {
        case 'dynamic':
          selected = '动态'
          break
        case 'multifunc':
          selected = '功能区'
          break
        case 'addlist':
          selected = '通讯录'
          break
        case 'mine':
          selected = '我的'
          break
        default:
          break
      }
      this.selected = selected
      this.tabSelected = 'tab-container' + (this.bottomTab.indexOf(selected) + 1)
    }
  },
  components: {
    Message,
    Dynamic,
    MultiFunc,
    AddList,
    Mine
  },
  mounted () {
    this.changeQuery()
    if (this.$route.query.refer_page === 'dynamic') {
      this.selected = '动态'
    }
  },
  computed: {
    tabSelected: {
      get: function () {
        let selectedTab, selectedIndex
        switch (this.selected) {
          case '消息':
            selectedTab = 'tab-container1'
            selectedIndex = 0
            break
          case '动态':
            selectedTab = 'tab-container2'
            selectedIndex = 1
            break
          case '功能区':
            selectedTab = 'tab-container3'
            selectedIndex = 2
            break
          case '通讯录':
            selectedTab = 'tab-container4'
            selectedIndex = 3
            break
          case '我的':
            selectedTab = 'tab-container5'
            selectedIndex = 4
            break
          default:
            break
        }
        
        var arr = [false, false, false, false, false]
        this.actived = arr.map((val, index) => {
          return selectedIndex === index
        })
        return selectedTab
      },
      set: function () {
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

  @import url(../common/styles/base.less);

  #container{
    min-height: calc(~"100% - @{footerHeight} - @{headerHeight}");
    position: absolute;
    left: 0;
    top: @headerHeight;
    right: 0;
    bottom: 0;
  }

  .mint-tab-container
  {
    height: 100%;
    // margin-bottom: @footerHeight;
    background-color: #f9f9f9;
  }

  // style加scoped作用域会在样式后面加唯一标志符data,导致部分样式失效
  .mint-tab-container-wrap,
  .mint-tab-container-item
  {
    height: 100% !important;
  }

  .is-selected>.mint-tab-item-label {
    font-size: 12px;
  }

  .mint-tabbar {
    background-color: #fff;
  }
  .mint-tab-item-icon{
    width: auto !important;
    display: inline-block !important;
    > i{
      font-size: 24px;
    }
  }

</style>
