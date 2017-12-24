const db = require('../../db')
const connection = db.connection

exports.get_personal_message = async(userId) => {
  const sql = `SELECT a.*
  FROM user_detail a, USER b
  WHERE a.user_id = ?
  AND b.userid = a.user_id`
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql, [userId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  return data
}
