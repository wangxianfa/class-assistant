<template>
  <div class="dialog">
    <span class="avatar"><img src="/static/images/robot.png" alt="robot"></span>
    <div class="dialog-msg">
      <p class="nickname" v-if="true">机器人小欣</p>
      <div class="msg">
        你好，我是机器人小欣，请问有什么能够帮助您的\(^o^)/~
        <!-- 风 -->
        <span class="angle"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue'

}
</script>

<style lang="less" scoped>
  .dialog{

    display: flex;
    margin-top: 24px;
    margin-left: 14px;

    >.avatar>img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    >.dialog-msg{
      @dialog-bgc: #d0e9ff;
      width: calc(~"100% - 70px");

      margin-left: 15px;

      >.nickname{
        font-size: 12px;
        color: #666;
        margin-left: 4px;
        color: #9966CC;
      }

      >.msg {
        padding: 6px 10px 6px 10px;
        background-color: @dialog-bgc;
        min-width: 40px;
        max-width: 80%;
        min-height: 36px;
        border-radius: 10px;
        font-size: 14px;
        color: #666;
        position: relative;
        margin-top: 6px;
        line-height: 24px;
        display: inline-block;

        >.angle{
          width: 0;
          height: 0;
          // border-top-color: #ccFF99;
          // border-right-color: #ff0099;
          // border-bottom-color: #00ff99;
          // border-left-color: #9900ff;
          border-color: transparent transparent transparent @dialog-bgc;
          border-width: 13px 20px 20px 10px;
          border-style: solid;
          left: -10px;
          top: 4px;
          // top: calc(~"50% - 15px");
          position: absolute;
          transform-origin: left top;
          transform: rotateZ(-26.5deg);
          // display: none;
        }

      }
    }
  }
</style>
