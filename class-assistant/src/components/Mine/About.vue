<template>
  <div id="about">
    <mt-header fixed title="关于助手" class="header">
      <router-link to="/setting" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="wrap">
      <figure>
        <img src="/static/images/icons/class-log.png" alt="class log">
        <div class="version">版本号 V0.01</div>
      </figure>
      <div class="content">
        <p>爱班级是一款为大学辅导员和学生专属设计的班级管理好帮手。在这里，辅导员可以随时随地掌握学生动向，轻松管理班级学生事务。</p>        
        <p>爱班级自动建立学生通讯录，辅导员联系学生和家长十分方便。学生可以匿名和辅导员进行无障碍交流，让学生和辅导员能畅所欲言的吐露心声。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);
  
  .wrap{
    margin-top: calc(~"@{headerHeight} + 24px");

    >figure{
      margin: 0;
      text-align: center;
      padding: 20px 12px;

      >.version{
        margin-top: 10px;
        font-style: italic;
        color: #999;
        font-size: 14px;
      }

    }

    >.content{
      padding: 15px 12px;
      >p{
        text-indent: 2em;
        font-size: 14px;
        color: #666;
        line-height: 24px;
        margin-top: 12px;
      }
    }

  }

</style>
