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
