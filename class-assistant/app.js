const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const app = express()
const bodyParser = require('body-parser')
/* eslint-disable */
const db = require('./services/db')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 后端路由模块引入
const loginRouter = require('./services/login')
const chat = require('./services/chat')
const message = require('./services/message')

const server = http.createServer(app)

var io = socketIO(server)

server.listen(8888, '192.168.191.1', () => {
  console.log('> 服务已于端口8888启动...')
})

// 后端路由管理
app.post('/api/login', loginRouter.login)
app.post('/api/chat/sendmessage', chat.sendMessage)
app.get('/api/chat/message/:userId/:otherUserId', chat.getMessage)
app.get('/api/message/all/:userId', message.getAllMessage)
app.get('/', (req, res) => {
  res.send('1')
})

const socketHander = require('./services/socket')  // socket要实现的具体逻辑

var group = {}

io.on('connection', (socket) => {
  // 监听用户登录
  socket.on('login', (userId) => {
    // 保存用户的id和socketid
    socketHander.saveUserSocketId(userId, socket.id)
  })

  // 监听用户发私聊信息
  socket.on('sendPrivateMessage', async(data) => {
    const {to_user} = data
    // 根据用户的id取到socketid，从而实现只对该用户推送新消息
    const socketid = await socketHander.getUserSocketId(to_user)
    // io.sockets.emit('receivePrivateMessage', 'for your eyes only');
    io.to(socketid).emit('receivePrivateMessage', data.message);
    
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
    console.log(socket.id + '连接断开')
  })
})

// const robot = require('./services/robot')

// app.post('/robot', robot.chatWithRobot)
