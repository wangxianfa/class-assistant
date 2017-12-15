const db = require('../../db')
const connection = db.connection

exports.getMessage = async (userId, otherUserId) => {
  // 先把chat表的is_enter_chat置为1,把message_user表的is_read置为1，
  let sql = 'UPDATE chat SET is_enter_chat = 1 WHERE user_id = ? AND other_user_id = ?'
  await connection.query(sql, [userId, otherUserId])

  sql = 'UPDATE message_user SET is_read =1 WHERE to_user = ? AND from_user = ? AND is_read =0'
  await connection.query(sql, [userId, otherUserId])

  // 最后获取消息
  sql = `
    SELECT a.from_user, a.to_user, a.message, a.time, b.avatar 
    FROM message_user a, user_detail b
    WHERE (
    a.to_user =?
    AND a.from_user =?
    OR a.from_user =?
    AND a.to_user =?
    )
    AND b.user_id = a.from_user ORDER BY TIME ASC
  `

  function get_message () {
    return new Promise(function (resolve, reject) {
      connection.query(sql, [userId, otherUserId, userId, otherUserId], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  const message = await get_message()

  // 用户信息
  sql = `SELECT b.beizhu,c.avatar FROM user a, friend b,user_detail c
    WHERE a.userid=? AND b.user_id = ? AND b.other_user_id = a.userid 
    AND c.user_id=a.userid limit 1
  `

  function get_info () {
    return new Promise(function (resolve, reject) {
      connection.query(sql, [otherUserId, userId], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  const info = await get_info()

  // 别人对自己的备注（socket时会用到）
  sql = 'SELECT beizhu from friend WHERE user_id = ? AND other_user_id = ? limit 1 '

  function get_info1 () {
    return new Promise(function (resolve, reject) {
      connection.query(sql, [otherUserId, userId], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results)
      })
    })
  }

  const info1 = await get_info1()

  return {
    code: 1,
    data: {
      message,
      info: info[0] || {},
      info1: info1[0] || {}
    }
  }
}

exports.sendMessage = async (userId, otherUserId, message, time) => {
  // console.log(userId, otherUserId, message, time)
  // 先查一下状态
  const {is_enter_chat = 0} = await getStatus(otherUserId, userId)

  const data = {
    from_user: userId,
    to_user: otherUserId,
    message,
    time,
    is_read: is_enter_chat
  }
  const sql = 'insert into message_user set ? '

  const res = await insert(sql, [data])

  return res.affectedRows > 0 ? {
    code: 1,
    message: '发送成功'
  } : {
    code: 0,
    message: '发送失败'
  }
}

function getStatus (userId, otherUserId) {
  // console.log(userId, otherUserId)
  return new Promise(function (resolve, reject) {
    const sql = 'select is_enter_chat from chat where user_id = ? AND other_user_id = ? limit 1'
    connection.query(sql, [userId, otherUserId], (error, results) => {
      if (error) {
        reject(error)
      }
      // console.log(results)
      resolve(results[0] || {})
    })
  })
}

function insert (sql, params) {
  return new Promise(function (resolve, reject) {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}
