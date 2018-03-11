import * as types from '../mutation-types'
import * as api from '@/api/person'

// state
const state = {
  personal: {},
  updateStatus: false
}

// mutations
const mutations = {
  [types.GET_PERSONAL_MESSAGE] (state, data) {
    state.personal = Object.assign({}, data)
  },
  [types.UPDATE_STATUS] (state, data) {
    state.updateStatus = data
  }
}

// actions
const actions = {
  async get_personal_message (context, userId) {
    const data = await api.get_personal_message(userId)

    let { res_data } = data.content

    Object.assign(res_data[0], {sex: res_data.sex === 'F' ? '女' : '男'})

    context.commit(types.GET_PERSONAL_MESSAGE, res_data[0])
  },

  async update_personal_message ({ commit }, data) {
    const { content, userId } = data
    const result = await api.set_personal_message(content, userId)
    commit(types.UPDATE_STATUS, !!result.code)
  }
}

export default {
  state,
  mutations,
  actions
}
