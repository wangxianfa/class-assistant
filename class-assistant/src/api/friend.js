import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/friend'

export const get_new_friends = (userId) => {
  console.log('get_new_friends')
}

export const get_friend_list = async (userId) => {
  const url = `${API_CONFIG}/list/${userId}`
  const result = await request_get(url)
  return result
}

export const get_counsellors = async (institute) => {
  const url = `${API_CONFIG}/counsellor/${institute}`
  const result = await request_get(url)
  return result
}
