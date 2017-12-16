<template>
  <div :class="['dialog', self ? 'self' : 'other']">
    <span class="avatar"><img :src="avatar" alt="robot"></span>
    <div class="dialog-msg">
      <p class="nickname" v-if="showNickname">{{nickname}}</p>
      <div :class="['msg', self ? 'self-msg' : 'other-msg']">
        <!-- {{ info || '你好，我是机器人发，请问有什么能够帮助您的\(^o^)/~' }} -->
        <slot name="text"></slot>
        <slot name="url"></slot>
        <slot name="list"></slot>
        <!-- 风 -->
        <span :class="['angle', self ? 'self-angel' : 'other-angel']"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialogue',
  mounted () {
    this.nickname = this.$props.data.nickname
    this.avatar = this.$props.data.avatar || '/static/images/robot.png'
    this.self = this.$props.data.self
    this.showNickname = this.$props.data.showNickname || false // 一对一通信不显示昵称信息
  },
  data () {
    return {
      nickname: '',
      avatar: '',
      self: false,
      showNickname: false
    }
  },
  props: ['data']
}
</script>

<style lang="less" scoped>
  a:link{
    text-decoration: underline;
    color: #21c6cd;
  }
  a:visited {
    color: blue;
  }

  .dialog{

    display: flex;
    margin: 12px 0 12px 0;

    >.avatar>img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    >.dialog-msg{
      width: calc(~"100% - 70px");

      >.nickname{
        font-size: 12px;
        color: #333;
        // margin-left: 4px;
      }

      >.msg {
        padding: 6px 10px 6px 10px;
        min-width: 40px;
        max-width: 84%;
        min-height: 36px;
        border-radius: 10px;
        font-size: 14px;
        position: relative;
        margin-top: 6px;
        line-height: 24px;
        display: inline-block;
        text-align: center;

        p{
          display: inline-block;
          text-align: left;
        }

        >a{
          display: block;
          word-wrap:break-word;
          text-align: left;
        }

        .list{

          >li{
            margin-top: 20px;

            >h2{
              font-size: 15px;
              font-weight: bold;
              text-align: left;
            }
            >p{
              text-align: left;
              width: 100%;
              color: #999;
              font-size: 13px;
            }
            >img{
              width: 100%;
              border-radius: 8px;
              margin: 6px 0;
            }

            img[lazy=loading] {
              width: 100%;
              height: 152px;
              margin: 6px 0;
            }

            >a{
              display: block;
              word-wrap:break-word;
              text-align: left;
            }
          }

          >li:nth-of-type(1){
            margin-top: 10px;
          }
        }

        >.angle{
          width: 0;
          height: 0;
          // border-top-color: #ccFF99;
          // border-right-color: #ff0099;
          // border-bottom-color: #00ff99;
          // border-left-color: #9900ff;
          border-style: solid;
          position: absolute;
        }

      }
    }
  }

  .self{
    @dialog-bgc: #fff;
    @fontColor: #333;

    margin-left: 14px;
    >.dialog-msg{
      margin-left: 15px;

      >.nickname{
        color: @fontColor;
      }
      >.self-msg {
        background-color: @dialog-bgc;
        p{
          color: @fontColor;
        }

        >.self-angel{
          border-color: transparent transparent transparent @dialog-bgc;
          border-width: 13px 20px 20px 10px;
          left: -10px;
          top: 4px;
          transform-origin: left top;
          transform: rotateZ(-26.5deg);
        }

      }
    }
  }

  .other{
    @dialog-bgc: #575757;
    
    justify-content: flex-end;
    margin-right: 14px;
    >.avatar{
      order: 1;
    }
    >.dialog-msg{
      margin-right: 15px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      >.other-msg {
        background-color: @dialog-bgc;

        >.other-angel{
          border-color: transparent @dialog-bgc transparent transparent;
          border-width: 13px 10px 20px 20px;
          right: 4px !important;
          top: 0px;
          transform-origin: right bottom;
          transform: rotateZ(26.5deg);
        }

      }
    }
  }
</style>
