import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Main from '@/components/Main'
import ChatOne from '../components/Message/ChatOne.vue'
import ChatGroup from '../components/Message/ChatGroup.vue'
import Personal from '../components/Mine/Personal.vue'
import Setting from '../components/Mine/Setting.vue'
import MsgEdit from '../components/Mine/MsgEdit.vue'

const Login = () => import('../components/Vertify/Login.vue')
const Register = () => import('../components/Vertify/Register.vue')
const About = () => import('../components/Mine/About.vue')
const MsgWarn = () => import('../components/Mine/MsgWarn.vue')

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
      path: '/chatone/:userid',
      name: 'chatOne',
      component: ChatOne
    },
    {
      path: '/chatgroup/:groupid',
      name: 'chatGroup',
      component: ChatGroup
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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/msgwarn',
      name: 'msgwarn',
      component: MsgWarn
    }
  ]
})
