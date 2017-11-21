<template>
  <div class="login">
    <div class="welcome"><img src="/static/images/vertify/welcome.png"></div>
    <div class="login-form">
      <div class="login-inp"><label>昵称</label><input type="text" placeholder=""></div>
      <div class="login-inp"><label>邮箱</label><input type="text" placeholder=""></div>
      <div class="login-inp"><label>密码</label><input type="password" placeholder=""></div>
      <div class="login-inp"><label>确认</label><input type="password" placeholder=""></div>
      <div class="login-inp"><router-link to="#">立即注册</router-link></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Register'
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
  

</style>
