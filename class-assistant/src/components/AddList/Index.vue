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
        <img slot="icon" src="/static/images/add-list/3.png" alt="辅导员">
        好友
      </mt-tab-item>
      <mt-tab-item id="3">
        <img slot="icon" src="/static/images/add-list/4.png" alt="辅导员">
        群组
      </mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <!-- <mt-cell title="标题文字">
          <span>0人</span>
          <i class="fa fa-star" aria-hidden="true" slot="icon"></i>
        </mt-cell> -->

        <item v-for="(counsellor, index) in counsellors" :key="index" :data="counsellor" />

        <div class="noclass" v-if="false">
          <figure>
            <img src="/static/images/add-list/5.png" alt="noclass">
            <p>没有班级通讯录，您可以点击右上角添加去创建班级</p>
          </figure>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <group />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <router-link v-for="(item, index) in items"  :to="{name: 'chatGroup', params: {groupid: 1, header: item.nickname, avatar: item.avatar}}" :key="index">
          <Item :data="item" />
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>

  </div>
</template>

<script>

const Group = () => import('./Group.vue')
const Item = () => import('./Item.vue')

export default {
  name: 'AddList',
  data () {
    return {
      selected: '1',
      items: [
        {
          sid: 1,
          avatar: '/static/images/1.png',
          nickname: '毕业设计（2018）',
          detail: ''
        },
        {
          sid: 2,
          avatar: '/static/images/tengxun.png',
          nickname: '腾讯客服',
          detail: ''
        }
      ],
      counsellors: [
        {
          sid: 1,
          avatar: '/static/images/1.png',
          nickname: '王珩',
          detail: '2014级软工辅导员'
        },
        {
          sid: 2,
          avatar: '/static/images/tengxun.png',
          nickname: '宗茗',
          detail: '2014级计科辅导员'
        }
      ]
    }
  },
  components: {
    Group,
    Item
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

  .noclass{
    margin-top: 50px;
    >figure{
      text-align: center;
      >img{
        width: 50%;
      }
      >p{
        margin-top: 12px;
        color: #BDBDBD;
      }
    }
  }

</style>
