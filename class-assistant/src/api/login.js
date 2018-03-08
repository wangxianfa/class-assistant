import { request_post } from '../common/js/request'

const BASE_URL = '/api'

/**
 * [checkLogin 验证登录]
 * @param  {[type]} options.user [description]
 * @param  {[type]} options.pwd  [description]
 * @return {[type]}              [description]
 */
export const check_login = async({userid, psw}) => {
  const data = {
    userid: userid,
    psw: psw
  }

  const options = {
    method: 'post',
    baseURL: BASE_URL,
    url: '/login',
    data: data
  }

  const result = await request_post(options)

  return result
}
