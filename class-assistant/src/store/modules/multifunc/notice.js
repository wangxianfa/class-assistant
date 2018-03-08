import * as types from '../../mutation-types'
import * as api from '@/api/multifunc/notice'
import {parseChatTime} from '@/common/js/parse-time'

// init state
const state = {
  classNotices: [],
  noticeDetail: {},
  publishNoticeStatus: false
}

// mutations
const mutations = {
  [types.GET_NOTICES] (state, data) {
    state.classNotices = data
  },
  
  [types.GET_NOTICE_DETAIL] (state, data) {
    state.noticeDetail = Object.assign({}, data)
  },

  [types.PUBLISH_NOTICE_STATUS] (state, data) {
    state.publishNoticeStatus = data
  }
}

// actions
const actions = {
  async getClassNotices ({commit}, classId) {
    const res = await api.get_class_notices(classId)
    const { content } = res

    for (const item of content) {
      Object.assign(item, {noticeTime: parseChatTime(item.noticeTime)})
    }
    commit(types.GET_NOTICES, content)
  },

  async getNoticeDetail ({commit}, noticeId) {
    const res = await api.get_notice_detail(noticeId)
    const { content } = res
    if (Object.keys(content).length > 0) {
      Object.assign(content, {noticeTime: parseChatTime(content.noticeTime)})
    }
    commit(types.GET_NOTICE_DETAIL, content)
  },

  async publishNotice ({commit}, data) {
    const res = await api.publish_notice(data)
    if (res.code) {
      commit(types.PUBLISH_NOTICE_STATUS, true)
    } else {
      commit(types.PUBLISH_NOTICE_STATUS, false)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
