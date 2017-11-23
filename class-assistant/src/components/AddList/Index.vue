<template>
  <div id="addlist">
    <mt-header fixed title="通讯录" class="header">
      <mt-button slot="right">添加</mt-button>
    </mt-header>

    <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <img slot="icon" src="/static/images/add-list/1.png" alt="辅导员">
        辅导员
      </mt-tab-item>
      <mt-tab-item id="2">
        <img slot="icon" src="/static/images/add-list/2.png" alt="辅导员">
        同事
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="/static/images/add-list/3.png" alt="辅导员">
        好友
      </mt-tab-item>
      <mt-tab-item id="4">
        <img slot="icon" src="/static/images/add-list/4.png" alt="辅导员">
        群组
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell title="标题文字">
          <span>0人</span>
          <i class="fa fa-star" aria-hidden="true" slot="icon"></i>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 8" :title="'选项 ' + n" :key="n" />
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>
export default {
  name: 'AddList',
  data () {
    return {
      selected: '1'
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #addlist{
    height: 667px;
    background-color: #f9f9f9;
    margin-top: 20px;
  }

  .header{
    background-color: #fff;
    color: #4a4a4a;
    border-bottom: 1px solid #e1e1e1;
    .is-left *,
    .is-right *
    {
      color: #26a2ff !important;
    }
  }

  .mint-tab-item-icon{
    height: 30px;
  }
  .mint-tab-item-icon > * {
      width: auto;
  }

  .mint-tab-container{
    margin-top: 20px;
    i{
      color: gold;
      font-size: 18px !important;
      margin-right: 12px;
    }
  }

  .mint-navbar .mint-tab-item.is-selected {
      border-bottom: none;
      margin-bottom: 0;
      color: inherit;
  }

</style>
