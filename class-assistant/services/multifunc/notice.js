const classInfo = require('../controller/notice')

exports.get_class_notices = async(req, res) => {
  const { classId } = req.params
  const res_data = await classInfo.get_class_notices(classId)

  res.send({
    code: 1,
    message: '请求成功',
    content: res_data
  })
}

exports.get_notice_detail = async(req, res) => {
  const { noticeId } = req.params
  const res_data = await classInfo.get_notice_detail(noticeId)

  res.send({
    code: 1,
    message: '请求成功',
    content: res_data[0] ? res_data[0] : {}
  })
}
