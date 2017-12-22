<template>
  <div id="personalhomepage">
    <div class="top" :style="{background: 'url(' + this.profile_bg + ')', backgroundSize: 'cover' }">
      <mt-header>
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    
    <figure>
      <img src="/static/images/1.png" alt="profile_bg" />
      <h3>小小发</h3>
      <p>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</p>
    </figure>

    <div class="detail">
      <ul>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_account.png" alt="num"></span>
          <p>201421092075</p>
        </li>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_information.png" alt="num"></span>
          <p>男 22岁 天秤座 武汉</p>
        </li>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_profession.png" alt="num"></span>
          <p>打篮球</p>
        </li>
      </ul>
    </div>

    <footer>
      <button>个性名片</button>
      <button>编辑资料</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data () {
    return {
      profile_bg: '/static/images/profile/profile_bg.jpg'
    }
  }
}
</script>

<style lang="less" scoped>
  #personalhomepage{
    >.top{
      height: 200px;
      position: relative;
      // background:'static/images/profile/profile_bg.jpg';
      // background-image: url(/static/images/profile/profile_bg.jpg);
      // background-position: center center;
      // background-repeat: no-repeat;
      >.mint-header{
        background-color: transparent;
        height: 52px;
      }
    }

    >figure{
      // display: inline-block;
      // width: 100%;
      margin: 0;
      text-align: center;
      position: relative;
      top: -49px;
      >img{ 
        display: inline-block;
        width: 98px;
        height: 98px;
        border-radius: 50%;
        left: 50%;
      }
      >h3{
        margin-top: 2px;
        font-size: 18px;
        text-align: center;
      }
      >p{
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 75%;
        margin: auto;
      }
    }

    >.detail{
      position: relative;
      top: -30px;
      padding: 0 12px;
      li{
        display: flex;
        margin-top: 12px;
        img{
          height: 20px;
          margin-right: 10px;
        }
        p{
          flex-grow: 1;
        }
      }
    }

    >footer{
      position: fixed;
      bottom: 0;
      border-top: 1px solid #f8f8f8;
      padding: 6px 12px;
      display: flex;
      width: 100%;

      >button{
        border: none;
        outline: none;
        background-color: #fff;
        width: 50%;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border: 1px solid #f8f8f8;
        font-size: 16px;
        border-radius: 6px;
      }
      >button:nth-of-type(1){
        margin-right: 6px;
        color: #333;
      }
      >button:nth-of-type(2){
        margin-left: 6px;
        background-color: #3385FF;
        color: #fff;
      }
    }
  }
</style>
