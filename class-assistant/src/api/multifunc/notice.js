import { request_get, request_post } from '@/common/js/request'

const API_CONFIG = '/api/multi/notice'

export const get_class_notices = async (classId) => {
  const url = `${API_CONFIG}/${classId}`
  const result = await request_get(url)
  return result
}

export const get_notice_detail = async (noticeId) => {
  const url = `${API_CONFIG}/detail/${noticeId}`
  const result = await request_get(url)
  return result
}

export const publish_notice = async (data) => {
  const options = {
    method: 'post',
    baseURL: '/api',
    url: '/multi/notice/publish',
    data: data
  }
  const result = await request_post(options)
  return result
}
