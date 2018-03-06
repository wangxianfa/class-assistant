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
