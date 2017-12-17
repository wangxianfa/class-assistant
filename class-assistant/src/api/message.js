import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/message'

/**
 * [getAllMessage 获取某个用户的首页的所有消息]
 * @param  {[type]} userId [用户id]
 * @return {[type]}        [消息]
 */
export const get_all_message = async(userId) => {
  const url = `${API_CONFIG}/all/${userId}`
  const res = await request_get(url)
  return res
}
