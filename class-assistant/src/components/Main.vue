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
        <!-- <img :src="actived[0] ? '/static/images/icons/home2.png' : '/static/images/icons/home.png'" alt="message"> -->
        消息
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(1)" id="动态">
        <i slot="icon" :class="['fa', actived[1] ? 'fa-star' : 'fa-star-o']" aria-hidden="true"></i>
        <!-- <img slot="icon" :src="actived[1] ? '/static/images/icons/zhaoda2.png' : '/static/images/icons/zhaoda.png'" alt="message"> -->
        动态
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(2)" id="功能区">
        <i slot="icon" :class="['fa', actived[2] ? 'fa-circle' : 'fa-circle-o']" aria-hidden="true"></i>
        <!-- <img slot="icon" :src="actived[1] ? '/static/images/icons/zhaoda2.png' : '/static/images/icons/zhaoda.png'" alt="message"> -->
        功能区
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(3)" id="通讯录">
        <i slot="icon" :class="['fa', actived[3] ? 'fa-address-card' : 'fa-address-card-o']" aria-hidden="true"></i>
        <!-- <img slot="icon" :src="actived[2] ? '/static/images/icons/zhiguan2.png' : '/static/images/icons/zhiguan.png'" alt="message"> -->
        联系人
      </mt-tab-item>
      <mt-tab-item @click.native="itemClick(4)" id="我的">
        <i slot="icon" :class="['fa', actived[4] ? 'fa-user-circle' : 'fa-user-circle-o']" aria-hidden="true"></i>
        <!-- <img slot="icon" :src="actived[3] ? '/static/images/icons/mine2.png' : '/static/images/icons/mine.png'" alt="message"> -->
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>

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
      tabSelected: 'tab-container1'
    }
  },
  methods: {
    itemClick: function (selected) {
      this.tabSelected = 'tab-container' + (selected + 1)
      var arr = [false, false, false, false, false]
      this.actived = arr.map((val, index) => {
        return selected === index
      })
    }
  },
  components: {
    Message,
    Dynamic,
    MultiFunc,
    AddList,
    Mine
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
