import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/class'

export const get_class_message = (classId) => {
  const url = `${API_CONFIG}/info/${classId}`
  return request_get(url)
}
