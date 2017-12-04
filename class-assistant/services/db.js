const mysql = require('mysql')

const opt = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'class-assistant'
}

const connection = mysql.createConnection(opt)

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error
  console.log('The solution is: ', results[0].solution)
})

connection.end()

module.exports = connection
