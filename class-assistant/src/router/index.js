import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Main from '@/components/Main'
import ChatRoom from '../components/Message/ChatRoom.vue'
import Personal from '../components/Mine/Personal.vue'
import Setting from '../components/Mine/Setting.vue'
import MsgEdit from '../components/Mine/MsgEdit.vue'

const Login = () => import('../components/Vertify/Login.vue')
const Register = () => import('../components/Vertify/Register.vue')

Vue.use(Mint)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/chatroom',
      name: 'chatRoom',
      component: ChatRoom
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/msgedit',
      name: 'msgEdit',
      component: MsgEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
