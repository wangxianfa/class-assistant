import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'

import Main from '@/components/Main'
import ChatRoom from '../components/Message/ChatRoom.vue'

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
    }
  ]
})
