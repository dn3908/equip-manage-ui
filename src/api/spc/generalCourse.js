import request from '@/utils/request'

// 查询系列课程列表
export function listGeneralCourse(query) {
  return request({
    url: '/spc/generalCourse/list',
    method: 'get',
    params: query
  })
}

// 查询系列课程详细
export function getGeneralCourse(id) {
  return request({
    url: '/spc/generalCourse/' + id,
    method: 'get'
  })
}

// 新增系列课程
export function addGeneralCourse(data) {
  return request({
    url: '/spc/generalCourse',
    method: 'post',
    data: data
  })
}

// 修改系列课程
export function updateGeneralCourse(data) {
  return request({
    url: '/spc/generalCourse',
    method: 'put',
    data: data
  })
}

// 删除系列课程
export function delGeneralCourse(id) {
  return request({
    url: '/spc/generalCourse/' + id,
    method: 'delete'
  })
}

// 导出系列课程
export function exportGeneralCourse(query) {
  return request({
    url: '/spc/generalCourse/export',
    method: 'get',
    params: query
  })
}