const message = require('./controller/message')
/* eslint-disable */
exports.getAllMessage = async(req, res) => {
  // console.log(req.params)
  const userId = req.params.userId
  // 先获取私聊消息
  const singleMessage = await message.getSingleMessage(userId)
  // console.log(singleMessage)
  // 再获取群聊消息
  const groupMessage = await message.getGroupMessage(userId)

  res.json({
    code: 1,
    data: {
      singleMessage,
      groupMessage
    }
  })

}