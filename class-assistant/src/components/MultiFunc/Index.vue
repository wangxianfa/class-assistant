<template>
  <div id="multifunc">
    <mt-header fixed title="中南民族大学" class="header"></mt-header>
    <div class="otherFuc">
      <ul class="clearfix">
        <router-link to="/multifunc/notice">
          <li>
            <figure>
              <img src="/static/images/func/notice.png" />
              <p>通知</p>
            </figure>
          </li>
        </router-link>
        <li @click="noPublic">
          <figure>
            <img src="/static/images/func/please_leave.png" />
            <p>请销假</p>
          </figure>
        </li>
        <li @click="noPublic">
          <figure>
            <img src="/static/images/func/attendance.png" />
            <p>班级考勤</p>
          </figure>
        </li>
        <!-- <li>
          <figure>
            <img src="/static/images/func/add.png" />
          </figure>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiFunc',
  methods: {
    noPublic: function () {
      this.$store.dispatch('setShowTips', '此功能暂未开放')
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #multifunc{
    /* padding-top: calc(~"@{headerHeight}"); */
    background-color: #fff;
    height: 100%;
  }
  
  li{
    float: left;
    margin-top: 20px;
    margin-left: calc(~"(100% - 4*72px)/5")
  }

  figure{
    display: inline-block;
    margin: 0;
    &>img{
      width: 72px;
      height: 72px;
    }
    &>p{
      text-align: center;
      margin-top: 8px;
    }
  }
</style>
