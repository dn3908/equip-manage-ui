import request from '@/utils/request'

// 查询目标标签列表
export function listTag(query) {
  return request({
    url: '/spc/tag/list',
    method: 'get',
    params: query
  })
}

// 查询目标标签详细
export function getTag(id) {
  return request({
    url: '/spc/tag/' + id,
    method: 'get'
  })
}

// 新增目标标签
export function addTag(data) {
  return request({
    url: '/spc/tag',
    method: 'post',
    data: data
  })
}

// 修改目标标签
export function updateTag(data) {
  return request({
    url: '/spc/tag',
    method: 'put',
    data: data
  })
}

// 删除目标标签
export function delTag(id) {
  return request({
    url: '/spc/tag/' + id,
    method: 'delete'
  })
}

// 导出目标标签
export function exportTag(query) {
  return request({
    url: '/spc/tag/export',
    method: 'get',
    params: query
  })
}