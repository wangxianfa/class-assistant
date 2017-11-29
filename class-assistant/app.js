const express = require('express')
const app = express()

const robot = require('./services/robot')

app.post('/robot', robot.chatWithRobot)

app.listen(3000, 'localhost', () => {
  console.log('服务已在 localhost 3000 成功启动')
})
