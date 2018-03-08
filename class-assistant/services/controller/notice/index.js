const db = require('../../db')
const connection = db.connection

exports.get_class_notices = async(classId) => {
  const sql = `SELECT a.class_id as classId,
  a.notice_id as noticeId,
  a.notice_title as noticeTitle,
  a.notice_time as noticeTime,
  a.notice_body as noticeBody
  FROM notice a
  WHERE a.class_id = ?`
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql, [classId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
  return data
}

exports.get_notice_detail = async(noticeId) => {
  const sql = `SELECT a.class_id as classId,
  a.notice_id as noticeId,
  a.notice_title as noticeTitle,
  a.notice_time as noticeTime,
  a.notice_body as noticeBody
  FROM notice a
  WHERE a.notice_id = ? limit 1`
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql, [noticeId], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
  return data
}

exports.publish_notice = async(data) => {
  const sql = 'insert into notice set ? '
  const sql2 = 'select a.notice_id as id from notice a GROUP BY a.notice_id DESC limit 1'
  
  var maxNoticeId = await new Promise(function (resolve, reject) {
    connection.query(sql2, [], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
  
  var result = await new Promise(function (resolve, reject) {
    connection.query(sql, [Object.assign(data, {'notice_id': ++maxNoticeId[0].id})], (error, results) => {
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
