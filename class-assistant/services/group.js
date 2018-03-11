const group = require('./controller/group')

exports.get_group_detail = async (req, res) => {
  const { groupId, userId } = req.params
  const result = await group.get_group_detail(parseInt(groupId, 10), userId)
  res.json(result)
}
