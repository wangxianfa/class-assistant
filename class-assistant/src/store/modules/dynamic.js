import * as types from '../mutation-types'
import * as api from '@/api/dynamic'

// init state
const state = {
  classMessage: {
    dynamics: []
  }
}

// mutations
const mutations = {
  [types.GET_CLASS_MESSAGE] (state, data) {
    state.classMessage = Object.assign({}, data)
  }
}

// actions
const actions = {
  async getClassMessage ({commit}, classId) {
    const res = await api.get_class_message(classId)

    const {content = {}} = res
    const { res_data } = content
    const { dynamics } = res_data

    let dingUserArr, ding

    for (const dynamicItem of dynamics) {
      dingUserArr = Array.from(new Set(dynamicItem.dingUser.split(',')))
      ding = parseInt(dynamicItem.ding, 10)
      if (dynamicItem.ding !== dingUserArr.length) {
        ding = dingUserArr.length
      }
      Object.assign(dynamicItem, {'dingUser': dingUserArr, 'ding': ding})
    }

    commit(types.GET_CLASS_MESSAGE, res_data)
  }
}

export default {
  state,
  actions,
  mutations
}
