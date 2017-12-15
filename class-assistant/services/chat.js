
const chat = require('./controller/chat')

exports.sendMessage = async(req, res) => {
  const { userId, otherUserId, message, time } = req.body
  // console.log(req.body)
  // 数据库存储
  const res_data = await chat.sendMessage(userId, otherUserId, message, time)

  res.json(res_data)
}

exports.getMessage = async(req, res) => {
  // 获取双方聊天信息
  const res_data = await chat.getMessage(req.params.userId, req.params.otherUserId)

  res.json(res_data)
}
