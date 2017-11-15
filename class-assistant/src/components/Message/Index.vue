<template>
  <div id="message">
    <mt-header fixed title="消息" class="header">
      <span class="header-left" slot="left">
        <img src="/static/images/1.png" alt="avatar">
      </span>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul>
        <router-link to="/chatroom">
          <li v-for="item in list" :key="item">
            <span class="left"><img src="/static/images/1.png" alt="avatar"></span>
            <div class="right">
              <h2>
                <span>腾讯新闻</span>
                <time>9:00</time>
              </h2>
              <div class="content">
                <p>渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。</p>
                <mt-badge type="error" size="normal">10</mt-badge>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    loadTop: function () {
      // 加载更多数据
      this.$refs.loadmore.onTopLoaded()
    }
  }
}
</script>

<style lang="less" scoped>
  @avatarSize: 38px;

  a{
    text-decoration: none;
  }

  header{
    height: 54px;
    font-size: 18px;
  }

  .header-left{
    width: @avatarSize;
    height: @avatarSize;
    display: inline-block;
    &>img{  
      width: @avatarSize;
      height: @avatarSize;
      border-radius: 50%;
    }
  }

  .mint-loadmore{
    margin-top: 54px;
    margin-bottom: 56px;
    height: 100%;
  }

  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li{
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    padding: 12px 0;
    &>.left{
      &>img{
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 1px solid #dfdfdf;
        margin: 0 14px;
      }
    }

    &>.right{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%; // 使用calc方法失效， 得到不准确值
      &>h2{
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &>time{
          margin-right: 12px;
          font-size: 14px;
          color: #9c9c9c;
        }
      }
      
      &>.content{
        display: flex;
        justify-content: space-between;
        margin-top: 4px;
        align-items: center;
        &>p{
          width: 100%;
          margin: 0;
          margin-right: 10px;
          padding: 0;
          overflow: hidden;
          text-overflow: clip;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          font-size: 15px;
          color: #9c9c9c;
        }
        &>.mint-badge{
          margin-right: 12px;
        }
      }
    }
  }
</style>

