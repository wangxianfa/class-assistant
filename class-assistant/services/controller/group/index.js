const db = require('../../db')
const connection = db.connection

exports.get_group_detail = async (groupId, userId) => {
  const sql = `SELECT a.user_id, a.nick_name, a.add_time, b.* 
  FROM group_user a, groups b
  WHERE b.group_id = ? AND a.group_id = b.group_id AND a.user_id = ?`

  const result = await new Promise(function (resolve, reject) {
    connection.query(sql, [groupId, userId], (error, results) => {
      if (error) reject(error)
      resolve(results[0] || {})
    })
  })
  
  return {
    code: 1,
    message: 'ok',
    content: result
  }
}
