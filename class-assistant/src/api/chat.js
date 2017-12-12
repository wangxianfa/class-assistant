import {
  request_post
} from '../common/js/request'

export const send_message = (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/chat/sendmessage',
    data: data
  }
  console.log(options)
  return request_post(options)
}
