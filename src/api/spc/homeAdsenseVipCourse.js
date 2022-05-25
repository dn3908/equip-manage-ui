import request from '@/utils/request'

// 查询冲刺课广告位列表
export function listHomeAdsenseVipCourse(query) {
  return request({
    url: '/spc/homeAdsenseVipCourse/list',
    method: 'get',
    params: query
  })
}

// 查询冲刺课广告位详细
export function getHomeAdsenseVipCourse(id) {
  return request({
    url: '/spc/homeAdsenseVipCourse/' + id,
    method: 'get'
  })
}

// 新增冲刺课广告位
export function addHomeAdsenseVipCourse(data) {
  return request({
    url: '/spc/homeAdsenseVipCourse',
    method: 'post',
    data: data
  })
}

// 修改冲刺课广告位
export function updateHomeAdsenseVipCourse(data) {
  return request({
    url: '/spc/homeAdsenseVipCourse',
    method: 'put',
    data: data
  })
}

// 删除冲刺课广告位
export function delHomeAdsenseVipCourse(id) {
  return request({
    url: '/spc/homeAdsenseVipCourse/' + id,
    method: 'delete'
  })
}

// 导出冲刺课广告位
export function exportHomeAdsenseVipCourse(query) {
  return request({
    url: '/spc/homeAdsenseVipCourse/export',
    method: 'get',
    params: query
  })
}