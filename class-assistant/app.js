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
const friend = require('./services/friend')
const chatGroup = require('./services/chatGroup')
const person = require('./services/person')
const classInfo = require('./services/class')

const server = http.createServer(app)

var io = socketIO(server)

server.listen(8888, '192.168.1.107', () => {
  console.log('> 服务已于端口8888启动...')
})

// 后端路由管理
app.post('/api/login', loginRouter.login)
app.post('/api/chat/sendmessage', chat.sendMessage)
app.get('/api/chat/message/:userId/:otherUserId', chat.getMessage)
app.get('/api/message/all/:userId', message.getAllMessage)
app.get('/api/friend/list/:userId', friend.getFriendList)
app.get('/api/chatgroup/message/:userId/:groupId', chatGroup.getMessage)
app.post('/api/chatgroup/sendmessage', chatGroup.sendMessage)
app.get('/api/personal/getmessage/:userId', person.get_personal_message)
app.get('/api/class/info/:classId', classInfo.get_class_message)

const socketHander = require('./services/socket')  // socket要实现的具体逻辑

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
    io.to(socketid).emit('receivePrivateMessage', data);
    
  })

  // 监听用户发群消息
  socket.on('sendGroupMessage', (data) => {
    // 直接群发会快点，客户端只需要判断是否是发给自己的
    // socket.broadcast.emit信息传输对象为所有client，排除当前socket对应的client。
    // sending to all clients except sender
    socket.broadcast.emit('receiveGroupMessage', data)
  })

  socket.on('disconnect', () => {
    console.log(socket.id + '连接断开')
  })
})

// const robot = require('./services/robot')

// app.post('/robot', robot.chatWithRobot)
