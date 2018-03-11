import * as types from '../mutation-types'
import * as api from '@/api/group'
import {parseChatTime} from '@/common/js/parse-time'

// init state
const state = {
  groupDetail: {}
}

// mutations
const mutations = {
  [types.GET_GROUP_DETAIL] (state, data) {
    state.groupDetail = data
  }
}

// actions
const actions = {
  async getGroupDetail ({commit}, data) {
    const {groupId, userId} = data
    const res = await api.get_group_detail(groupId, userId)
    const { content } = res

    if (content.time) {
      var result = Object.assign({}, content, {createdTime: parseChatTime(content.time)})
    }
    commit(types.GET_GROUP_DETAIL, result)
  }
}

export default {
  state,
  actions,
  mutations
}
