import request from '@/utils/request'

// 查询客户预约列表
export function listAppointment(query) {
  return request({
    url: '/spc/appointment/list',
    method: 'get',
    params: query
  })
}

// 查询客户预约详细
export function getAppointment(id) {
  return request({
    url: '/spc/appointment/' + id,
    method: 'get'
  })
}

// 新增客户预约
export function addAppointment(data) {
  return request({
    url: '/spc/appointment',
    method: 'post',
    data: data
  })
}

// 修改客户预约
export function updateAppointment(data) {
  return request({
    url: '/spc/appointment',
    method: 'put',
    data: data
  })
}

// 删除客户预约
export function delAppointment(id) {
  return request({
    url: '/spc/appointment/' + id,
    method: 'delete'
  })
}

// 导出客户预约
export function exportAppointment(query) {
  return request({
    url: '/spc/appointment/export',
    method: 'get',
    params: query
  })
}