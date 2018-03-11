import * as types from '../mutation-types'
import * as api from '@/api/friend'
import * as constants from '@/common/constant/constant'

// state
const state = {
  'hasGetFriendList': 0, // 是否已经获取过好友列表
  'friendList': {},
  'hasGetNewFriends': 0,
  'newFriends': [],
  'friendStatus': {},
  'tabIndex': 1,  // 联系人页面的当前标签页
  'counsellors': [] // 辅导员
}

// mutations
const mutations = {
  [types.GET_FRIEND_LIST] (state, data) {
    state.hasGetFriendList = data.hasGetFriendList
    state.friendList = data.friendList
    state.friendStatus = data.friendStatus
  },
  [types.GET_NEW_FRIENDS] (state, data) {
    state.hasGetNewFriends = data.hasGetNewFriends
    state.newFriends = data.newFriends
  },
  [types.UPDATE_NEW_FRIENDS] (state, update) {
    (state.newFriends)[update.index].status = update.status
  },
  [types.TAB_INDEX] (state, tabIndex) {
    state.tabIndex = tabIndex
  },
  [types.UPDATE_FRIEND_LIST] (state) {
    state.hasGetFriendList = 0
  },
  [types.GET_COUNSELLORS] (state, data) {
    state.counsellors = data
  }
}

// actions
const actions = {
  async getFriendList ({commit}, userId) {
    const res = await api.get_friend_list(userId)

    let friendData = res.data.friend.allMember
    let fenzuData = res.data.friend.fenzu
    let groupData = res.data.group

    // 按在线状态和VIP类型降序排列
    friendData.sort((prev, current) => {
      // 先按在线状态排序
      if (prev.status == 0 && current.status > 0) {
        return true
      }
      // 否则不排序
      return false
    })
    // 按角色升序排列
    groupData.sort((prev, current) => {
      return prev.role - current.role
    })

    // 先将好友数据转换成指定格式
    let friend_arr = []
    for (let value0 of fenzuData.values()) {
      let fenzuName = value0.zu_name
      let friend = {
        name: fenzuName,
        sum: value0.zu_member.split(',').length,
        online: 0,
        members: []
      }
      /* eslint-disable */
      for (let [index, value] of friendData.entries()) {
        if (value.fenzu == fenzuName) {
          friend.members.push({
            id: value.id,
            name: value.name || value.nickName,
            face: value.avatar,
            loginStatus: value.loginStatus == 0 ? '离线' : value.loginStatus == 1 ? '手机在线'
                    : value.loginStatus == 2 ? '3G在线' : value.loginStatus == 3 ? '4G在线'
                    : value.loginStatus == 4 ? 'WiFi在线' : '电脑在线',
            sign: value.sign,
            chatType: 'single',
            status: value.status
          })
          if (value.status != 0) {
            friend.online++
          }
        }
      }
      friend_arr.push(friend)
    }

    // 再将群数据转换成指定格式
    let group_set = new Set() // 保存最终结果
    let group_map = new Map()
    /* eslint-disable */
    for (let [index, value] of groupData.entries()) {
      let fenzuName = value.role
      let group
      if (group_map.has(fenzuName)) {
        group = group_map.get(fenzuName)
      } else {
        group = {
          type: value.role == 0 ? '我创建的群' : value.role == 1 ? '我管理的群'
          : '我加入的群',
          groups: []
        }
      }
      group.groups.push({
        id: value.id,
        name: value.name,
        face: value.url,
        chatType: 'group'
      })
      group_map.set(fenzuName, group)
    }
    group_map.forEach((item) => {
      group_set.add(item)
    })
    const groups_arr = Array.from(group_set)

    let data = {
      hasGetFriendList: 1,
      friendList: {
        friends: friend_arr,
        groups: groups_arr
      },
      friendStatus: {
        friend: new Array(friend_arr.length).fill(0),
        group: new Array(groups_arr.length).fill(0)
      }
    }
    commit(types.GET_FRIEND_LIST, data)
  },
  async getNewFriends ({commit}, userId) {
    const res = await api.get_new_friends(userId)
    const data = {
      hasGetNewFriends: 1,
      newFriends: res.data
    }
    commit(types.GET_NEW_FRIENDS, data)
  },
  updateNewFriends: ({commit, state}, data) => {
    let newFriends = state.newFriends
    let indexOfNewFriends   // 要更新的项的下标
    for (let [index, value] of newFriends.entries()) {
      if (value.id == data.applyId) {
        indexOfNewFriends = index
        break
      }
    }
    const update = {
      index: indexOfNewFriends,
      status: data.status
    }
    commit(types.UPDATE_NEW_FRIENDS, update)
  },
  async getCounsellors ({commit, state}, institute) {
    const res = await api.get_counsellors(institute)
    const { content } = res
    var counsellors = []
    for (const counsellor of content) {
      counsellors.push({
        id: counsellor.user_id,
        name: counsellor.nick_name,
        face: counsellor.avatar,
        loginStatus: counsellor.loginStatus == 0 ? '离线' : counsellor.loginStatus == 1 ? '手机在线'
                : counsellor.loginStatus == 2 ? '3G在线' : counsellor.loginStatus == 3 ? '4G在线'
                : counsellor.loginStatus == 4 ? 'WiFi在线' : '电脑在线',
        sign: counsellor.signature,
        chatType: 'single',
        xingzuo: counsellor.xingzuo,
        age: counsellor.age,
        favor: counsellor.favor,
        profileBg: counsellor.profile_bg,
        favor: counsellor.favor,
        gradeId: counsellor.grade_id,
        institute: counsellor.institute,
        major: counsellor.major,
        sex: counsellor.sex === 'M' ? '男' : '女',
        place: counsellor.place,
        status: counsellor.status,
        job: constants.INSTITUTE[counsellor.institute] + ' ' + counsellor.grade_id + ' ' +  constants.MAJOR[counsellor.major] + '辅导员'
      })
    }

    commit(types.GET_COUNSELLORS, counsellors)
  }
}

export default {
  state,
  actions,
  mutations
}
