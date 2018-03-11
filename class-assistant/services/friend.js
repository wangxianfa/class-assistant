const friend = require('./controller/friend')

exports.getFriendList = async(req, res) => {
  const { userId } = req.params
  const res_data = await friend.getFriendList(userId)
  res.send(res_data)
}

exports.getCounsellors = async(req, res) => {
  const { institute } = req.params
  const res_data = await friend.getCounsellors(institute)
  res.send({
    code: 1,
    message: '请求成功',
    content: res_data
  })
}
