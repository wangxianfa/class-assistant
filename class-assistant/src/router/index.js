import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Main from '@/components/Main'
// import Dynamic from '../components/Dynamic/Index.vue'
// import MultiFunc from '../components/MultiFunc/Index.vue'
import ChatOne from '../components/Message/ChatOne.vue'
import ChatGroup from '../components/Message/ChatGroup.vue'
import ChatWidthRobot from '../components/Message/ChatWidthRobot.vue'
import Personal from '../components/Mine/Personal.vue'
import Setting from '../components/Mine/Setting.vue'
// import MsgEdit from '../components/Mine/MsgEdit.vue'

const Login = () => import('../components/Vertify/Login.vue')
const Register = () => import('../components/Vertify/Register.vue')
const About = () => import('../components/Mine/About.vue')
const MsgWarn = () => import('../components/Mine/MsgWarn.vue')
const PersonalHomePage = () => import('../components/Message/PersonalHomePage.vue')
const GroupHomePage = () => import('../components/Message/GroupHomePage.vue')
const Notice = () => import('../components/MultiFunc/Notice.vue')
const NoticeDetail = () => import('../components/MultiFunc/NoticeDetail.vue')
const PublishDynamic = () => import('../components/Dynamic/PublishDynamic.vue')
const PublishNotice = () => import('../components/MultiFunc/NoticePublish.vue')
// const AllMsg = () => import('../components/Mine/AllMsg.vue')

Vue.use(Mint)
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    // {
    //   path: '/dynamic',
    //   name: 'dynamic',
    //   component: Dynamic
    // },
    // {
    //   path: '/multi',
    //   name: 'multi',
    //   component: MultiFunc
    // },
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
      path: '/chatrobot',
      name: 'chatWidthRobot',
      component: ChatWidthRobot
    },
    {
      path: '/personalhomepage/:userid',
      name: 'personalHomePage',
      component: PersonalHomePage
    },
    {
      path: '/grouphomepage/:groupid',
      name: 'groupHomePage',
      component: GroupHomePage
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
    },
    {
      path: '/multifunc/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/multifunc/notice/publish',
      name: 'PublishNotice',
      component: PublishNotice
    },
    {
      path: '/multifunc/notice/:noticeId',
      name: 'noticeDetail',
      component: NoticeDetail
    },
    {
      path: '/dynamic/publish',
      name: 'PublishDynamic',
      component: PublishDynamic
    }
  ]
})
