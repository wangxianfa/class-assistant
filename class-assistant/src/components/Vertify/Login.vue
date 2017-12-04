<template>
  <div class="login">
    <Warn></Warn>
    <div class="welcome"><img src="/static/images/vertify/welcome.png"></div>
    <div class="login-form">
      <div class="login-inp"><label>账号</label><input type="text" placeholder="" v-model="userinfo.userid"></div>
      <div class="login-inp"><label>密码</label><input type="password" placeholder="" v-model="userinfo.psw"></div>
      <div class="login-inp"><button @click="login">立即登录</button></div>
    </div>
    <div class="login-txt"><router-link to="/register">立即注册</router-link>|<a href="#">忘记密码？</a></div>

    <div class="other_login">
        <div class="other"></div>
        <span>其他方式登录</span>
        <div class="other"></div>
    </div>
    <div class="other_choose">
        <a href="#">
            <i class="fa fa-qq"></i>
        </a>
        <a href="#">
            <i class="fa fa-wechat"></i>
        </a>
        <a href="#">
            <i class="fa fa-weibo"></i>
        </a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {check_login} from '../../api/login'
import Warn from '../../base/Warn/Warn'

export default {
  name: 'Login',
  data () {
    return {
      userinfo: {
        userid: '',
        psw: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created () {
    // 如果已经登陆了，则进入消息页面
    this.isLogin && this.$router.push('/')
  },
  methods: {
    login: async function () {
      // 数据验证
      if (!this.validate(this.userinfo)) return
      // alert(1)
      // 登陆中...
      this.$store.dispatch('setShowWarn', '登陆中...')

      // 登录
      const res = await check_login(this.userinfo)
      this.callback(res)
    },
    // 验证账号密码不为空
    validate: function ({userid, psw}) {
      if (userid == '') {
        this.$store.dispatch('setShowWarn', '输入不能为空')
        return false
      }
      if (psw == '') {
        this.$store.dispatch('setShowWarn', '密码不能为空')
        return false
      }
      return true
    },
    // 登陆后的回调
    callback: function ({code, data, message}) {
      if (code == 1) {
        window.socket.emit('login', data.loginStatus.userId)
        this.$store.commit('SET_LOGIN', data)
        this.$store.commit('ADD_USER', data)
        this.$router.push('message')
      } else {
        this.$store.dispatch('setShowWarn', message)
      }
    }
  },
  components: {
    Warn
  }
}
</script>

<style lang="less" scoped>

  .login {
      width:100%;
      height:100%;
      background:url(/static/images/vertify/login-bg.png) no-repeat;
      background-size:cover;
      position:fixed;
  }
  .welcome {
      width:100%;
      margin:25% 0;
  }
  .welcome img {
      width:100%;
  }
  .login-inp {
      margin:0 30px 15px 30px;
      border:1px solid #fff;
      border-radius:25px;
  }
  .login-inp label {
      width:4em;
      text-align:center;
      display:inline-block;
      color:#fff;
  }
  .login-inp input {
      line-height:40px;
      color:#fff;
      background-color:transparent;
      border:none;
      outline: none;
  }
  .login-inp button {
      display:block;
      width:100%;
      text-align:center;
      line-height:40px;
      color:#fff;
      font-size:16px;
      letter-spacing:5px;
      outline: none;
      background-color: transparent;
      border: none;
  }
  .login-txt {
      text-align:center;
      color:#fff;
  }
  .login-txt a {
      color:#fff;
      padding:0 5px;
  }

  .other_login {
      width: 80%;
      height: 15px;
      margin: 32px 10%;
  }
  .other_login .other, .other_login span {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
  }
  .other_login .other {
      width: 28%;
      height: 8px;
      border-bottom:1px solid #2f2c59;
  }
  .other_login span {
      width:40%;
  }

  .other_choose {
      width: 74%;
      margin: 0 13%;
      display: flex;
      justify-content: space-between;
  }
  .other_choose a {
      width: 50px;
      height: 50px;
      display: block;
      border: 2px solid #dfdfdf;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  i{
    font-size: 28px;
    color: #dfdfdf;
  }
</style>
