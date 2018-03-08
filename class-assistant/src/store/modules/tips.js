import * as types from '../mutation-types'

// init state
const state = {
  isShow: false,
  message: ''
}

// mutations
const mutations = {
  [types.SHOW_TIPS] (state, {isShow, message}) {
    state.isShow = isShow
    state.message = message
  }
}

// actions
const actions = {
  setShowTips: ({ commit }, message) => {
    let tips = {
      'isShow': true,
      'message': message
    }
    commit(types.SHOW_TIPS, tips)
    setTimeout(() => {
      tips = {
        'isShow': false,
        'message': ''
      }
      commit(types.SHOW_TIPS, tips)
    }, 1500)
  }
}

export default {
  state,
  actions,
  mutations
}
