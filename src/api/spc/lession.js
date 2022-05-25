import request from '@/utils/request'

// 查询章节小节列表
export function listLession(query) {
  return request({
    url: '/spc/lession/list',
    method: 'get',
    params: query
  })
}

// 查询章节小节详细
export function getLession(id) {
  return request({
    url: '/spc/lession/' + id,
    method: 'get'
  })
}

// 新增章节小节
export function addLession(data) {
  return request({
    url: '/spc/lession',
    method: 'post',
    data: data
  })
}

// 修改章节小节
export function updateLession(data) {
  return request({
    url: '/spc/lession',
    method: 'put',
    data: data
  })
}

// 删除章节小节
export function delLession(id) {
  return request({
    url: '/spc/lession/' + id,
    method: 'delete'
  })
}

// 导出章节小节
export function exportLession(query) {
  return request({
    url: '/spc/lession/export',
    method: 'get',
    params: query
  })
}