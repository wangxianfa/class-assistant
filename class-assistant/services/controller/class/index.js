const db = require('../../db')
const connection = db.connection

const get_class_dynamics = async(classId) => {
  const sql = `SELECT dynamic_id as dynamicId,
  b.dynamic_time as dynamicTime,
  b.dynamic_text as dynamicText,
  b.tag as tags,
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

  return data || []
}

exports.get_class_message = async(classId) => {
  const sql = `SELECT a.class_id as classId, a.class_name as className, 
  a.class_avatar as classAvatar
  FROM class a
  WHERE a.class_id = ?`
  let classMessage = await new Promise(function (resolve, reject) {
    connection.query(sql, [classId], (error, results) => {
      if (error) reject(error)
      // 若不是json对象
      if (Object.prototype.toString.call(results[0]) === '[object Object]') {
        resolve(results[0])
      } else {
        resolve({})
      }
    })
  })

  const classDynamics = await get_class_dynamics(classId)

  classMessage.dynamics = classDynamics || []

  return classMessage
}

exports.setClassDing = async(dynamicId, userId) => {
  const sql1 = `SELECT
  b.ding_user as dingUser
  FROM dynamic_class b
  WHERE dynamic_id = ?`
  var dingUser = await new Promise(function (resolve, reject) {
    connection.query(sql1, [dynamicId], (error, results) => {
      if (error) reject(error)
      resolve(results[0].dingUser || '')
    })
  })

  if (dingUser) {
    dingUser += (',' + userId)
  } else {
    dingUser = userId + ''
  }

  const sql2 = `UPDATE dynamic_class 
  SET ding_user = ?
  WHERE dynamic_id = ?`
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql2, [dingUser, dynamicId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  return data.affectedRows > 0 ? {
    code: 1,
    message: '点赞成功'
  } : {
    code: 0,
    message: '点赞失败'
  }
}

exports.publish = async(data) => {
  const sql = 'insert into dynamic_class set ? '
  const sql2 = 'select a.dynamic_id as id from dynamic_class a GROUP BY a.dynamic_id DESC limit 1'
  
  var maxDynamicId = await new Promise(function (resolve, reject) {
    connection.query(sql2, [], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
  
  var result = await new Promise(function (resolve, reject) {
    connection.query(sql, [Object.assign(data, {'dynamic_id': ++maxDynamicId[0].id})], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })

  return result.affectedRows > 0 ? {
    code: 1,
    message: '发布成功'
  } : {
    code: 0,
    message: '发布失败'
  }
}