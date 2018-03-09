const login = require('./controller/login')

exports.login = async(req, res) => {
  const userid = req.body.userid
  const psw = req.body.psw

  const check_user = await login.check_user(userid)
  if (check_user.length == 0) res.send({'code': 0, 'message': '此用户不存在'})

  const check_psw = await login.check_psw(userid, psw)
  if (check_psw.length == 0) res.send({'code': 0, 'message': '密码错误,请检查'})

  // 更新登录状态
  login.update_login_status(userid)
  const loginStatus = {
    userid,
    isLogin: 1
  }
  // 取出用户的基本信息
  const userInfo = await login.getUserDetail(userid)
  res.send({
    'code': 1,
    'message': '登陆成功',
    'data': {
      loginStatus,
      userInfo
    }
  })
}

exports.refresh_data = async (req, res) => {
  const { userId } = req.params
  const userInfo = await login.getUserDetail(userId)
  res.send({
    'code': 1,
    'message': 'ok',
    'data': {
      userInfo
    }
  })
}
