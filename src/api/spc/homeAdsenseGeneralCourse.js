import request from '@/utils/request'

// 查询系列课广告位列表
export function listHomeAdsenseGeneralCourse(query) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse/list',
    method: 'get',
    params: query
  })
}

// 查询系列课广告位详细
export function getHomeAdsenseGeneralCourse(id) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse/' + id,
    method: 'get'
  })
}

// 新增系列课广告位
export function addHomeAdsenseGeneralCourse(data) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse',
    method: 'post',
    data: data
  })
}

// 修改系列课广告位
export function updateHomeAdsenseGeneralCourse(data) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse',
    method: 'put',
    data: data
  })
}

// 删除系列课广告位
export function delHomeAdsenseGeneralCourse(id) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse/' + id,
    method: 'delete'
  })
}

// 导出系列课广告位
export function exportHomeAdsenseGeneralCourse(query) {
  return request({
    url: '/spc/homeAdsenseGeneralCourse/export',
    method: 'get',
    params: query
  })
}