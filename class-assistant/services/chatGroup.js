const chatGroup = require('./controller/chatGroup')

exports.getMessage = async(req, res) => {
  const {userId, groupId} = req.params
  const res_data = await chatGroup.getMessage(userId, groupId)
  res.send(res_data)
}

exports.sendMessage = async(req, res) => {
  const {userId, groupId, message, nick_name, time} = req.body
  const res_data = await chatGroup.sendMessage(userId, groupId, message, nick_name, time)
  res.send(res_data)
}
