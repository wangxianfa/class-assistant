<template>
  <div class="login">
    <div class="welcome"><img src="/static/images/vertify/welcome.png"></div>
    <div class="login-form">
      <div class="login-inp"><label>登录</label><input type="text" placeholder=""></div>
      <div class="login-inp"><label>密码</label><input type="password" placeholder=""></div>
      <div class="login-inp"><router-link to="#">立即登录</router-link></div>
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
export default {
  name: 'Login'
}
</script>

<style lang="less" scoped>

  .login {
      width:100%;
      height:100%;
      background:url(/static/images/vertify/login-bg.png) no-repeat;
      background-size:cover;
      position:fixed;
      z-index:-10;
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
  .login-inp a {
      display:block;
      width:100%;
      text-align:center;
      line-height:40px;
      color:#fff;
      font-size:16px;
      letter-spacing:5px;
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
