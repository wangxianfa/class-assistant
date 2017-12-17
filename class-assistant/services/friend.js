const friend = require('./controller/friend')

exports.getFriendList = async(req, res) => {
  const { userId } = req.params
  const res_data = await friend.getFriendList(userId)
  res.send(res_data)
}
