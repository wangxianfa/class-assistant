import { request_get } from '@/common/js/request'

const API_CONFIG = '/api/multi/notice'

export const get_class_notices = (classId) => {
  const url = `${API_CONFIG}/${classId}`
  return request_get(url)
}

export const get_notice_detail = (noticeId) => {
  const url = `${API_CONFIG}/detail/${noticeId}`
  return request_get(url)
}
