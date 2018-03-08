import {
  request_post,
  request_get
} from '../common/js/request'

export const send_message = async (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/chat/sendmessage',
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
export const get_message = async (userId, otherUserId) => {
  const url = `/api/chat/message/${userId}/${otherUserId}`
  const result = await request_get(url)
  return result
}
