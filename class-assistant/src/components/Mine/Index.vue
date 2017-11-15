<template>
  <div id="mine">
    <mt-header fixed title="我的" class="header"></mt-header>
    <div class="wrap">
      <div class="personal">
        <img src="/static/images/1.png" alt="avatar">
        <div class="right">
          <div class="msg">
            <span class="name">王小明</span>
            <p class="signature">暂无个性签名</p>
          </div>
          <i class="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </div>
      <div class="others">
        <div class="item">
          <i class="fa fa-calendar-check-o"></i>
          我的日程
        </div>
        <div class="item">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          我的报告
        </div>
        <div class="item">
          <i class="fa fa-star-o"></i>
          我的关注
        </div>
      </div>
      <div class="setting">
        <div class="item">
          <i class="fa fa-cog" aria-hidden="true"></i>
          设置
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine'
}
</script>

<style lang="less" scoped>
  @import url(../../common/styles/base.less);

  #mine{
    min-height: 1000px;
  }

  header{
    background-color: #fff;
    color: #4a4a4a;
    border-bottom: 1px solid #e1e1e1;
  }

  i{
    color: #aeaeaa;
    font-size: 16px;
  }

  .item{
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e1e1e1;
    
    &>i{
      margin: 0 15px;
      color: #26a2ff;
    }
  }

  .item:nth-last-of-type(1){
    border-bottom: none;
  }

  .wrap{
    margin-top: calc(~"@{headerHeight} + 20px");
    .personal{
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;

      &>img{
        width: 64px;
        height: 64px;
        border-radius: 8px;
        border: 1px solid #dfdfdf;
        margin-right: 12px;
      }

      &>.right{
        width: calc(~"100% - 78px");
        display: flex;
        align-items: center;
        justify-content: space-between;

        &>.msg{
          &>.name{
            display: inline-block;
            line-height: 24px;
            font-size: 16px;
            font-weight: 500px;
          }
          &>.signature{
            line-height: 20px;
            font-size: 14px;
            color: #959595;
            margin-top: 4px;
          }
        }
      }
    }

    .others{
      background-color: #fff;
      margin-top: 16px;
      &>.item{
        &:extend(.item);
      }
      &>.item:nth-last-of-type(1){
        border-bottom: none;
      }
    }

    .setting{
      background-color: #fff;
      margin-top: 16px;
    }
  }

</style>
