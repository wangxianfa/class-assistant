const mysql = require('mysql')

const opt = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'class-assistant'
}

const connection = mysql.createConnection(opt)

connection.connect((err) => {
  if (err) {
    console.error('[connection connect]  failed!')
    return false
  }

  console.log('[connection connect]  succeed!')
})

// function selectAll () {
//   return new Promise(function (resolve, reject) {
//     connection.query('select * from user', (error, results) => {
//       resolve(results)
//     })
//   })
// }

// (async () => {
//   var res = await selectAll()
//   console.log(res)
// })()

exports.connection = connection
