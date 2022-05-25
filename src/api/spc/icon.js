import request from '@/utils/request'

// 查询icon功能列表
export function listIcon(query) {
  return request({
    url: '/spc/icon/list',
    method: 'get',
    params: query
  })
}

// 查询icon功能详细
export function getIcon(id) {
  return request({
    url: '/spc/icon/' + id,
    method: 'get'
  })
}

// 新增icon功能
export function addIcon(data) {
  return request({
    url: '/spc/icon',
    method: 'post',
    data: data
  })
}

// 修改icon功能
export function updateIcon(data) {
  return request({
    url: '/spc/icon',
    method: 'put',
    data: data
  })
}

// 删除icon功能
export function delIcon(id) {
  return request({
    url: '/spc/icon/' + id,
    method: 'delete'
  })
}

// 导出icon功能
export function exportIcon(query) {
  return request({
    url: '/spc/icon/export',
    method: 'get',
    params: query
  })
}