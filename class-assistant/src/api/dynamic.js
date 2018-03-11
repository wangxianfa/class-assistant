import { request_get, request_post } from '@/common/js/request'

const API_CONFIG = '/api/class'

export const get_class_message = async (classId) => {
  const url = `${API_CONFIG}/info/${classId}`
  const result = await request_get(url)
  return result
}

export const class_dynamic_ding = async (dynamicId, userId) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/class/ding',
    data: {
      dynamicId: dynamicId,
      userId: userId
    }
  }
  const result = await request_post(options)
  return result
}

export const publish = async (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/class/publish',
    data: data
  }
  const result = await request_post(options)
  return result
}
