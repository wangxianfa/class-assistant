const db = require('../db')
const connection = db.connection

module.exports = {
  saveUserSocketId: (userId, socketId) => {
    const sql = 'update user set socketid=? where userid=? limit 1 '
    connection.query(sql, [socketId, userId], (error, result) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(result)
    })
  },
  getUserSocketId: (userId) => {
    // 查询相关用户socketid
    return new Promise(function (resolve, reject) {
      const sql = 'SELECT socketid FROM user WHERE userid=? '
      connection.query(sql, [userId], (error, result) => {
        if (error) {
          reject(error)
        }
        resolve(result[0].socketid)
      })
    })
  }
}
