const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const app = express()

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('> 服务已于端口8000启动...')
})

var io = socketIO.listen(server)

const socketHander = require('./services/socket')  // socket要实现的具体逻辑

var group = {}

io.on('connection', (socket) => {
  // 监听用户登录
  socket.on('login', (userId) => {
    // 保存用户的id和socketid
    socketHander.saveUserSocketId(userId, socket.id)
  })

  // 监听用户发私聊信息
  socket.on('privateMessage', (data) => {
    const {to_user} = data
    // 根据用户的id取到socketid，从而实现只对该用户推送新消息
    const socketid = socketHander.getUserSocketId(to_user)
    socket.to(socketid).emit('receivePrivateMessage', data)
  })

  // 监听用户发群消息
  socket.on('groupMessage', (data) => {
    console.log(data)
    group[data.group_id] = socket
    // 直接群发会快点，客户端只需要判断是否是发给自己的
    // socket.broadcast.emit信息传输对象为所有client，排除当前socket对应的client。
    socket.broadcast.emit('receiveGroupMessage', data)
  })

  socket.on('disconnect', () => {
    console.log('连接断开')
  })
})

// const robot = require('./services/robot')

// app.post('/robot', robot.chatWithRobot)
