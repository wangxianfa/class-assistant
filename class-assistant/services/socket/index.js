module.exports = {
  saveUserSocketId: (userId, socketId) => {
    console.log('userId: ' + userId + ', socketId: ' + socketId)
  },

  getUserSocketId: (userId) => {
    console.log('获取用户' + userId + '所关联的socketid')
  }
}