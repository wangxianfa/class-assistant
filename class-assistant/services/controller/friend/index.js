const db = require('../../db')
const connection = db.connection

exports.getFriendList = async(userId) => {
  // 先获取好友
  const friend = await getFriend(userId)
  // 再获取群
  const group = await getGroup(userId)

  return {
    code: 1,
    data: {
      friend,
      group
    }
  }
}

async function getFriend (userId) {
  // 数据结构：
  // id:5,
  // name:'马哲涵',
  // special:1,
  // face:'/static/user/face/4.jpg',
  // sign:'哈哈,今天特别开心',
  // vip:0,
  // status:0,
  // fenzu:'晓风残月'
  const sql1 = `
      SELECT a.other_user_id AS id, a.beizhu AS name, 
      b.avatar, b.signature AS sign,
      b.status,
      b.nick_name as nickName
      FROM friend a
      JOIN user_detail b ON a.user_id =?
      AND a.is_friend=1
      AND b.user_id = a.other_user_id
      `
  // 没有包含分组的数据
  const res1 = await (new Promise(function (resolve, reject) {
    connection.query(sql1, [userId], (error, results) => {
      if (error) {
        reject(error)
      }
      // console.log(results)
      resolve(results)
    })
  }))

  const sql2 = 'SELECT zu_name,zu_member from fenzu where user_id= ?'

  // 包含了分组的数据
  const res2 = await (new Promise(function (resolve, reject) {
    connection.query(sql2, [userId], (error, results) => {
      if (error) {
        reject(error)
      }
      // console.log(results)
      resolve(results)
    })
  }))

  // 将res1转换成包含分组的数据
  for (let [index1, value1] of res1.entries()) {
    /* eslint-disable */
    for (let [index2, value2] of res2.entries()) {
      let arr = value2.zu_member.split(',')
      if (arr.includes(value1.id)) {
        res1[index1]['fenzu'] = value2.zu_name
        break
      }
    }
  }

  return {
    allMember: res1,  // 所有的成员
    fenzu: res2  // 所有的分组
  }
}

async function getGroup (userId) {
  // 数据结构：
  // id:1,
  // role:0,
  // name:'英语四六级自动查询',
  // url:'/static/user/face/4.jpg'  
  const sql = `
    SELECT a.group_id AS id, a.role, 
    b.group_name AS name, b.group_avator AS url
    FROM group_user a
    JOIN groups b ON a.user_id =?
    AND b.id = a.group_id
    `

  const rows = await new Promise(function (resolve, reject) {
    connection.query(sql, [userId], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
  return rows
}

exports.getCounsellors = async(institute) => {
  const sql = `
  SELECT a.*
  FROM user_detail a, user b
  WHERE status = 3 AND institute = ?
  AND a.user_id = b.userid
  `
  const data = await new Promise(function (resolve, reject) {
    connection.query(sql, [institute], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
  return data
}
