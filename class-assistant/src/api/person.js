import {
  request_post,
  request_get
} from '../common/js/request'

export const set_personal_message = (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/personal/setmessage',
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
export const get_personal_message = (userId) => {
  const url = `/api/personal/getmessage/${userId}`
  return request_get(url)
}
