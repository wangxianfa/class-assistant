<template>
  <div class="group">
    <mt-cell title="我的组" @click.native="stretchClick">
      <span slot="icon" class="stretch">
        <i :class="['fa', stretch ? 'fa-angle-down' : 'fa-angle-right']" aria-hidden="true"></i>
      </span>
    </mt-cell>
    <div class="list">
      <ul v-show="stretch">
        <router-link v-for="(item, index) in items"  :to="{name: 'chatRoom', params: {header: item.nickname, avatar: item.avatar}}" tag="li" :key="index">
          <span class="avatar">
            <img :src="item.avatar" alt="avatar">
          </span>
          <div class="right">
            <h2 class="nickname">{{item.nickname}}</h2>
            <p class="detail">{{item.detail || '暂无其他信息'}}</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'group',
  data () {
    return {
      stretch: false,
      items: [
        {
          sid: 1,
          avatar: '/static/images/1.png',
          nickname: '小小发',
          detail: 'we are what we repeatedlly do'
        },
        {
          sid: 2,
          avatar: '/static/images/tengxun.png',
          nickname: '腾讯客服',
          detail: ''
        }
      ]
    }
  },
  methods: {
    stretchClick: function () {
      this.stretch = !this.stretch
    }
  }
}
</script>

<style lang="less" scoped>
  .stretch{
    display: inline-block;
    width: 14px;

    >i{
      margin-right: 8px;
      color: #dfdfdf;
      font-size: 16px !important;
    }
  }

  li{
    display: flex;
    padding: 10px;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f8f8f8;

    >.avatar{
      margin-right: 10px;
      img{
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }

    >.right{
      width: calc(~"100% - 46px");

      h2{
        font-size: 14px;
        color: 333;
      }
      .detail{
        font-size: 13px;
        color: #999;
      }
    }
  }
</style>
