import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Main from '@/components/Main'
import ChatRoom from '../components/Message/ChatRoom.vue'
import Personal from '../components/Mine/Personal.vue'
import Setting from '../components/Mine/Setting.vue'
import MsgEdit from '../components/Mine/MsgEdit.vue'

Vue.use(Mint)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/chatroom',
      name: 'ChatRoom',
      component: ChatRoom
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/msgedit',
      name: 'MsgEdit',
      component: MsgEdit
    }
  ]
})
