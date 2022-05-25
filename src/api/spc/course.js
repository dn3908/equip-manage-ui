import request from '@/utils/request'

// 查询冲刺课广告位列表
export function listCourse(query) {
  return request({
    url: '/spc/course/list',
    method: 'get',
    params: query
  })
}

// 查询冲刺课广告位详细
export function getCourse(id) {
  return request({
    url: '/spc/course/' + id,
    method: 'get'
  })
}

// 新增冲刺课广告位
export function addCourse(data) {
  return request({
    url: '/spc/course',
    method: 'post',
    data: data
  })
}

// 修改冲刺课广告位
export function updateCourse(data) {
  return request({
    url: '/spc/course',
    method: 'put',
    data: data
  })
}

// 删除冲刺课广告位
export function delCourse(id) {
  return request({
    url: '/spc/course/' + id,
    method: 'delete'
  })
}

// 导出冲刺课广告位
export function exportCourse(query) {
  return request({
    url: '/spc/course/export',
    method: 'get',
    params: query
  })
}