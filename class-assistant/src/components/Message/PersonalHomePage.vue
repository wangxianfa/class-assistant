<template>
  <div id="personalhomepage">
    <div class="top" :style="{backgroundSize: 'cover', backgroundImage: 'url(' + this.personalMessage.profile_bg + ')' }">
      <mt-header>
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    
    <figure>
      <img :src="this.personalMessage.avatar" alt="avatar" />
      <h3>{{this.personalMessage.nick_name}}</h3>
      <p>{{this.personalMessage.signature}}</p>
    </figure>

    <div class="detail">
      <ul>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_account.png" alt="num"></span>
          <p>{{this.personalMessage.user_id}}</p>
        </li>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_information.png" alt="num"></span>
          <p>{{this.personalMessage.sex + ' ' +  this.personalMessage.age + '岁 ' + this.personalMessage.xingzuo + ' ' + this.personalMessage.place}}</p>
        </li>
        <li>
          <span><img src="/static/images/profile/qq_profilecard_item_profession.png" alt="num"></span>
          <p>{{this.personalMessage.favor}}</p>
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
import { mapGetters } from 'vuex'

export default {
  name: 'homePage',
  data () {
    return {
      profile_bg: '/static/images/profile/profile_bg.jpg'
    }
  },
  created () {
    this.$store.dispatch('get_personal_message', this.$route.params.userid)
  },
  computed: {
    ...mapGetters([
      'personalMessage'
    ])
  }
}
</script>

<style lang="less" scoped>
  #personalhomepage{
    >.top{
      height: 200px;
      position: relative;
      // background-size: cover;
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
