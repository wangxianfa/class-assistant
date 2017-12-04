import Vuex from 'vuex'
import Vue from 'vue'
import * as getters from './getters'
import * as actions from './actions'
import { state, mutations } from './mutations'

import message from './modules/message'
import warn from './modules/warn'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    message,
    warn
  }
})

export default store
