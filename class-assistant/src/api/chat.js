import {
  request_post,
  request_get
} from '../common/js/request'

export const send_message = (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/chat/sendmessage',
    data: data
  }
  return request_post(options)
}

/**
 * [get_message 获取用户的私聊消息]
 * @param  {[type]} userId      [用户ID]
 * @param  {[type]} otherUserId [另一个用户的id]
 * @return {[type]}             [description]
 */
export const get_message = (userId, otherUserId) => {
  const url = `/api/chat/message/${userId}/${otherUserId}`
  return request_get(url)
}
