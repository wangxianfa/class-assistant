import { request_get, request_post } from '@/common/js/request'

const API_CONFIG = '/api/class'

export const get_class_message = (classId) => {
  const url = `${API_CONFIG}/info/${classId}`
  return request_get(url)
}

export const class_dynamic_ding = (dynamicId, userId) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/class/ding',
    data: {
      dynamicId: dynamicId,
      userId: userId
    }
  }
  return request_post(options)
}
