const db = require('../../db')
const connection = db.connection

const get_class_dynamics = async(classId) => {
  const sql = `SELECT dynamic_id as dynamicId,
  b.dynamic_time as dynamicTime,
  b.dynamic_text as dynamicText,
  b.ding as ding,
  b.ding_user as dingUser
  FROM dynamic_class b
  WHERE b.class_id = ?`
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql, [classId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  return data
}

exports.get_class_message = async(classId) => {
  const sql = `SELECT a.class_id as classId, a.class_name as className, 
  a.class_avatar as classAvatar
  FROM class a
  WHERE a.class_id = ?`
  let classMessage = await new Promise(function (resolve, reject) {
    connection.query(sql, [classId], (error, results) => {
      if (error) reject(error)
      resolve(results[0])
    })
  })

  const classDynamics = await get_class_dynamics(classId)

  classMessage.dynamics = classDynamics

  return classMessage
}
