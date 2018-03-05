export const userId = state => state.loginStatus.userid
export const isLogin = state => state.loginStatus.isLogin
export const userInfo = state => state.userInfo
export const accounts = state => state.accounts
export const allMessage = state => state.message.allMessage
export const hasGetFriendList = state => state.friend.hasGetFriendList
export const friendList = state => state.friend.friendList
// export const friendStatus = state => state.friend.friendStatus
export const fenzu = state => state.friend.fenzu
// export const hasGetNewFriends = state => state.friend.hasGetNewFriends
// export const newFriends = state => state.friend.newFriends
// export const isShowSideBar = state => state.sidebar.isShowSideBar
// export const isShowMask = state => state.sidebar.isShowMask
// export const scrollPosition = state => state.scroll.position
// export const tabIndex = state => state.friend.tabIndex

export const personalMessage = state => state.person.personal
export const classMessage = state => state.classInfo.classMessage
export const classId = state => state.userInfo.class_id
export const dingStatus = state => state.classInfo.dingStatus
