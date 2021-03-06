const person = require('./controller/person')

exports.get_personal_message = async(req, res) => {
  const { userId } = req.params
  const res_data = await person.get_personal_message(userId)

  res.send({
    code: 1,
    message: '请求成功',
    content: {
      res_data
    }
  })
}

exports.set_personal_message = async (req, res) => {
  const { userId } = req.params
  const data = req.body
  const res_data = await person.set_personal_message(data, userId)

  res.json(res_data)
}
