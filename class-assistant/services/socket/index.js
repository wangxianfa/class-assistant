const db = require('../db')
const connection = db.connection

module.exports = {
  saveUserSocketId: (userId, socketId) => {
    console.log('userId: ' + userId + ', socketId: ' + socketId)

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
    console.log('获取用户' + userId + '所关联的socketid')
  }
}
