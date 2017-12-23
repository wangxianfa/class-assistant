import * as types from '../mutation-types'
import * as api from '@/api/person'

// state
const state = {
  personal: {}
}

// mutations
const mutations = {
  [types.GET_PERSONAL_MESSAGE] (state, data) {
    state.personal = Object.assign({}, data)
  }
}

// actions
const actions = {
  async get_personal_message (context, userId) {
    const data = await api.get_personal_message(userId)

    let { res_data } = data.content

    Object.assign(res_data[0], {sex: res_data.sex === 'F' ? '女' : '男'})

    context.commit(types.GET_PERSONAL_MESSAGE, res_data[0])
  }
}

export default {
  state,
  mutations,
  actions
}
