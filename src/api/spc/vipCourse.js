import request from '@/utils/request'

// 查询冲刺课列表
export function upOrDownVipCourse(id) {
  return request({
    url: '/spc/vipCourse/upOrDown/'+ id,
    method: 'get'
  })
}

// 查询冲刺课列表
export function listVipCourse(query) {
  return request({
    url: '/spc/vipCourse/list',
    method: 'get',
    params: query
  })
}

// 查询冲刺课详细
export function getVipCourse(id) {
  return request({
    url: '/spc/vipCourse/' + id,
    method: 'get'
  })
}

// 新增冲刺课
export function addVipCourse(data) {
  return request({
    url: '/spc/vipCourse',
    method: 'post',
    data: data
  })
}

// 修改冲刺课
export function updateVipCourse(data) {
  return request({
    url: '/spc/vipCourse',
    method: 'put',
    data: data
  })
}

// 删除冲刺课
export function delVipCourse(id) {
  return request({
    url: '/spc/vipCourse/' + id,
    method: 'delete'
  })
}

// 导出冲刺课
export function exportVipCourse(query) {
  return request({
    url: '/spc/vipCourse/export',
    method: 'get',
    params: query
  })
}