import {
  request_post,
  request_get
} from '../common/js/request'

export const set_personal_message = async (data, userId) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: `/personal/setmessage/${userId}`,
    data: data
  }
  const result = await request_post(options)
  return result
}

/**
 * [get_message 获取用户的私聊消息]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @return {[type]}             [description]
 */
export const get_personal_message = async (userId) => {
  const url = `/api/personal/getmessage/${userId}`
  const result = await request_get(url)
  return result
}
