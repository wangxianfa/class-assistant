<template>
  <div id="dynamic">
    <mt-header fixed title="动态" class="header"></mt-header>
    <div class="container">

      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <li v-for="item in items" :key="item">
            <div class="item">
              <div class="item-header">
                <img src="/static/images/1.png" alt="avatar">
                <div class="right">
                  <p class="name">小小发</p>
                  <time class="time">今天16:32</time>
                </div>
              </div>

              <div class="item-body">
                <p>前不久看到。看到标题的时候，我感到非常好奇。我知道虽然在异步程序中可以不使用配合来处理错误，但是处理方式并不能与配合得很好，所以很想知道到底有什么办法会比更好用。</p>
              </div>

              <div class="item-footer">
                <span class="ding">点赞91次</span>
                <div class="funcbar">
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  <i class="fa fa-commenting-o"></i>
                  <i class="fa fa-share-square-o"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Dynamic',
  data () {
    return {
      allLoaded: false,
      items: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    loadTop: function () {
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom: function () {
      this.$data.allLoaded = true
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  .container {
    padding-top: calc(~"@{headerHeight}");
    margin-bottom: 55px;

    .item{
      padding: 15px 0;
      background-color: #fff;
      margin-bottom: 24px;

      &>.item-header{
        display: flex;
        align-items: center;
        img{
          width: 54px;
          height: 54px;
          border-radius: 50%;
          margin: 0 12px;
        }

        &>.right{
          p{
            font-weight: 500;
            font-size: 15px;
            color: #000000;
          }
          .time{
            font-size: 13px;
            font-weight: 300;
            color: #999;
            margin-top: 5px;
            display: inline-block;
          }
        }
      }

      &>.item-body{
        padding: 0 12px;
        font-size: 16px;
        color: #333;
        font-weight: 500;
        margin-top: 12px;
      }

      &>.item-footer{
        display: flex;
        justify-content: space-between;
        padding: 0 12px;
        margin-top: 16px;

        .ding{
          font-size: 14px;
          color: #999;
          display: inline-block;
        }

        i{
          color: #666;
          font-size: 20px !important;
          margin: 0 10px;
        }
      }
    }

  }

</style>
