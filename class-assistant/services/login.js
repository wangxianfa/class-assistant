const db = require('./db')
const connection = db.connection

exports.login = async(req, res) => {
  const userid = req.body.userid
  const psw = req.body.psw
  var sql

  /**
   * 嵌套层次太深，改进async/await，待改进
   */

  // 验证用户名的正确性
  sql = `select id from user where userid = ?`
  connection.query(sql, userid, (error, result) => {
    if (error) {
      console.log('err')
    }
    if (result.length == 0) { // 如果用户名不存在则直接返回,否则检查密码
      res.send({
        'code': 0,
        'message': '此用户不存在'
      })
    } else {
       // 检查密码的正确性
      sql = `select id from user where userid = ? and psw= ?`
      connection.query(sql, [userid, psw], (error, result) => {
        if (error) {
          console.log('err1')
        }
        if (result.length == 0) { // 如果密码错误则直接返回,否则保存登陆信息
          res.send({
            'code': 0,
            'message': '密码错误,请检查'
          })
        } else {
          //
          // 更新登录状态
          const update = {
            last_login: Date.parse(new Date()) / 1000
          }
          sql = `update user set ? where userid = ? `
          connection.query(sql, [update, userid], (error, result) => {
            if (error) {
              console.log('err2')
            }

            const loginStatus = {
              userid,
              isLogin: 1
            }

            const userInfo = {
              'avatar': userid == '201421092075' ? '/static/images/1.png' : '/static/images/2.png',
              'nickname': '小小发',
              'sex': '男'
            }

            res.send({
              'code': 1,
              'message': '登陆成功',
              'data': {
                loginStatus,
                userInfo
              }
            })
          })
          //
        }
      })
    }
  })

  // res.json(result)
}
