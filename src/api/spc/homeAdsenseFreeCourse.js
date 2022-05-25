import request from '@/utils/request'

// 查询公开课广告位列表
export function listHomeAdsenseFreeCourse(query) {
  return request({
    url: '/spc/homeAdsenseFreeCourse/list',
    method: 'get',
    params: query
  })
}

// 查询公开课广告位详细
export function getHomeAdsenseFreeCourse(id) {
  return request({
    url: '/spc/homeAdsenseFreeCourse/' + id,
    method: 'get'
  })
}

// 新增公开课广告位
export function addHomeAdsenseFreeCourse(data) {
  return request({
    url: '/spc/homeAdsenseFreeCourse',
    method: 'post',
    data: data
  })
}

// 修改公开课广告位
export function updateHomeAdsenseFreeCourse(data) {
  return request({
    url: '/spc/homeAdsenseFreeCourse',
    method: 'put',
    data: data
  })
}

// 删除公开课广告位
export function delHomeAdsenseFreeCourse(id) {
  return request({
    url: '/spc/homeAdsenseFreeCourse/' + id,
    method: 'delete'
  })
}

// 导出公开课广告位
export function exportHomeAdsenseFreeCourse(query) {
  return request({
    url: '/spc/homeAdsenseFreeCourse/export',
    method: 'get',
    params: query
  })
}