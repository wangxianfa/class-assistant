const classInfo = require('./controller/class')

exports.get_class_message = async(req, res) => {
  const { classId } = req.params
  const res_data = await classInfo.get_class_message(classId)

  res.send({
    code: 1,
    message: '请求成功',
    content: {
      res_data
    }
  })
}

exports.class_dynamic_ding = async(req, res) => {
  const { userId, dynamicId } = req.body
  const res_data = await classInfo.setClassDing(dynamicId, userId)

  res.json(res_data)
}
