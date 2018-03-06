import * as types from '../mutation-types'
import * as api from '@/api/dynamic'
import { parseChatTime } from '@/common/js/parse-time'

// init state
const state = {
  classMessage: {
    dynamics: []
  },
  dingStatus: false
}

// mutations
const mutations = {
  [types.GET_CLASS_MESSAGE] (state, data) {
    state.classMessage = Object.assign({}, data)
  },
  [types.DING_STATUS] (STATE, data) {
    state.dingStatus = data
  }
}

// actions
const actions = {
  async getClassMessage ({commit}, classId) {
    const res = await api.get_class_message(classId)
    const {content = {}} = res
    const { res_data } = content
    const { dynamics } = res_data

    for (const dynamicItem of dynamics) {
      let ding
      let dingUserArr = []
      if (dynamicItem.dingUser) {
        dingUserArr = Array.from(new Set((dynamicItem.dingUser).split(',')))
      }
      ding = parseInt(dynamicItem.ding, 10)
      
      if (dynamicItem.ding !== dingUserArr.length) {
        ding = dingUserArr.length
      }
      Object.assign(dynamicItem, {'dingUser': dingUserArr, 'ding': ding, 'dynamicTime': parseChatTime(dynamicItem.dynamicTime)})
    }

    commit(types.GET_CLASS_MESSAGE, res_data)
  },

  async ding ({commit}, opts) {
    const {dynamicId, userId} = opts
    const res = await api.class_dynamic_ding(dynamicId, userId)
    if (res.code) {
      commit(types.DING_STATUS, true)
    } else {
      commit(types.DING_STATUS, false)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
