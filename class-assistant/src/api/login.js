import { request_post } from '../common/js/request'

const API_CONFIG = '/api/login'

/**
 * [checkLogin 验证登录]
 * @param  {[type]} options.user [description]
 * @param  {[type]} options.pwd  [description]
 * @return {[type]}              [description]
 */
export const check_login = ({user, psw}) => {
  const url = `${API_CONFIG}`
  const data = {
    userid: user,
    psw: psw
  }

  return request_post(url, data)
}
