<template>
  <div id="grouphomepage">
    <div class="top" :style="{backgroundSize: 'cover', backgroundImage: 'url(/static/images/profile/profile_bg.jpg)' }">
      <mt-header>
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right" @click="moreClick"></mt-button>
      </mt-header>
      <div class="message">
        <h3>软工四班就业群</h3>
        <p>6453027</p>
      </div>
    </div>

    <div class="functional">
      <ul>
        <li>
          <figure>
            <span><i class="fa fa-bullhorn" aria-hidden="true"></i></span>
            <span>公告</span>
          </figure>
        </li>
        <li>
          <figure> 
            <span><i class="fa fa-folder-o" aria-hidden="true"></i></span>
            <span>文件</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-picture-o" aria-hidden="true"></i></span>
            <span>相册</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-file-video-o" aria-hidden="true"></i></span>
            <span>小视频</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-calendar-o" aria-hidden="true"></i></span>
            <span>群日历</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-signal"></i></span>
            <span>群投票</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-link" aria-hidden="true"></i></span>
            <span>群链接</span>
          </figure>
        </li>
        <li>
          <figure>
            <span><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>
            <span>更多</span>
          </figure>
        </li>
      </ul>
    </div>

    <div class="detail">
      <mt-cell title="我的群名片" value="小小发" is-link></mt-cell>
      <mt-cell title="聊天记录" is-link></mt-cell>
      <mt-cell title="共享位置信息">
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="群消息免打扰">
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
      <mt-cell title="聊天背景" is-link></mt-cell>
      <mt-cell title="群介绍" label="本群创建于2017年09月12日"></mt-cell>
    </div>

    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
export default {
  name: 'grouphomepage',
  data () {
    return {
      value: false,
      actions: [
        {
          name: '分享群',
          method: ''
        },
        {
          name: '举报',
          method: ''
        },
        {
          name: '退出该群',
          method: ''
        }
      ],
      sheetVisible: false
    }
  },
  methods: {
    moreClick: function () {
      this.sheetVisible = !this.sheetVisible
    }
  }
}
</script>

<style lang="less">

  #grouphomepage{
    >.top{
      height: 180px;
      position: relative;
      // background-size: cover;
      >.mint-header{
        background-color: transparent;
        height: 52px;
      }

      >.message{
        color: #fff;
        position: absolute;
        bottom: 0;
        padding: 12px;
        width: 100%;
        font-size: 14px;

        h3{
          font-size: 16px;
        }
      }
    }

    >.functional{
      ul{
        display: flex;
        flex-wrap: wrap;

        li{
          display: inline-block;
          width: 25%;
          box-sizing: border-box;
          text-align: center;
          margin-top: 10px;

          figure{
            display: inline-block;
            margin: 0;
            text-align: center;
            span{
              display: inline-block;
              width: 100%;
              font-size: 12px;
              i{
                font-size: 16px;
              }
            }
          }
        }
      }
    }

    >.detail{
      margin-top: 20px;
      *{
        font-size: 14px;
      }
      .mint-switch-core{
        height: 26px;
      }
      .mint-switch-core::before {
        // width: 50px;
        height: 24px;
        background-color: #fdfdfd;
      }
      .mint-switch-core::after {
        height: 24px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }
    }

    .mint-actionsheet-listitem, .mint-actionsheet-button{
      font-size: 14px;
      color: #000000;
      border-bottom: 1px solid #f8f8f8;
    }

    .mint-actionsheet-listitem:nth-last-of-type(1) {
      color: #f00;
    }

    .mint-actionsheet-button {
      border-bottom: none;
    }
  }
</style>

