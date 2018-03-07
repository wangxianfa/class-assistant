import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/friend'

export const get_new_friends = (userId) => {
  console.log('get_new_friends')
}

export const get_friend_list = (userId) => {
  const url = `${API_CONFIG}/list/${userId}`
  return request_get(url)
}

export const get_counsellors = (institute) => {
  const url = `${API_CONFIG}/counsellor/${institute}`
  return request_get(url)
}
