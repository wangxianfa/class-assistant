import * as types from './mutation-types'
import * as api from '@/api/login'

// 登录
export const setLogin = ({commit}, data) => {  // 设置登录
  commit(types.SET_LOGIN, data)
}

export const refreshDate = async ({commit}, userId) => {
  const result = await api.refresh_data(userId)
  const { data } = result
  commit(types.SET_LOGIN, data)
}
