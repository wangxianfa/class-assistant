<template>
  <div id="setting">
    <mt-header fixed title="系统设置" class="header">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="systemSetting">
      <router-link to="/msgwarn">
        <div class="item">
          <i class="fa fa-commenting-o" aria-hidden="true"></i>
          消息提醒
        </div>
      </router-link>
      <div class="item">
        <i class="fa fa-lock"></i>
        修改密码
      </div>
      <div class="item">
        <i class="fa fa-user-secret"></i>
        权限隐私
      </div>
    </div>

    <div class="about">
      <div class="item" @click="clearClick">
        <i class="fa fa-recycle"></i>
        清除缓存
      </div>
      
      <router-link to="/about">  
        <div class="item">
          <i class="fa fa-exclamation-circle"></i>
          关于助手
        </div>
      </router-link>
    </div>

    <div class="exit">
      <mt-button type="danger" size="large" @click="logout">退出登录</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  name: 'Setting',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    logout: function () {
      MessageBox.confirm('确定退出当前账号？')
      .then(action => {
        console.log('action')
      })
      .catch(() => {
        console.log('cancel')
      })
    },
    clearClick: function () {
      MessageBox.confirm('将清空所有聊天记录及缓存数据', '')
      .then(action => {
        console.log('action')
      })
      .catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #setting{
    // height: 1000px;
    background-color: #f9f9f9;
    padding-top: calc(~"@{headerHeight} + 20px");
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

  .item{
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e1e1e1;
    background-color: #fff;
    
    &>i{
      margin: 0 15px;
      color: #26a2ff;
    }
  }
  
  .about{
    margin-top: 16px;
  }

  .exit{
    padding: 0 12px;
    margin-top: 12px;
  }

</style>
