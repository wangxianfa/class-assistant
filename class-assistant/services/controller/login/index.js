const db = require('../../db')
const connection = db.connection

// 验证用户名的正确性
exports.check_user = (userId) => {
  const sql = `select id from user where userid = ?`
  return new Promise(function (resolve, reject) {
    connection.query(sql, userId, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

// 检查密码的正确性
exports.check_psw = (userId, psw) => {
  const sql = `select id from user where userid = ? and psw= ?`
  return new Promise(function (resolve, reject) {
    connection.query(sql, [userId, psw], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

// 更新登录状态
exports.update_login_status = (userId) => {
  const update = {
    last_login: Date.parse(new Date()) / 1000
  }
  const sql = `update user set ? where userid = ? `

  return new Promise(function (resolve, reject) {
    connection.query(sql, [update, userId], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

/**
 * [getUserDetail 取出用户的基本信息]
 * @param  {[type]} userId [description]
 * @return {[type]}        [description]
 */
exports.getUserDetail = (userId) => {
  const sql = `
    select a.*
    from user_detail a 
    join user b on a.user_id = ? and b.userid=a.user_id
    `
  return new Promise(function (resolve, reject) {
    connection.query(sql, [userId], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results[0])
    })
  })
}
