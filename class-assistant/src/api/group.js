import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/group'

export const get_group_detail = async (groupId, userId) => {
  const url = `${API_CONFIG}/${groupId}/${userId}`
  const result = await request_get(url)
  return result
}
