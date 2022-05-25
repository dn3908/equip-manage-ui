import request from '@/utils/request'

// 查询公开课列表
export function listFreeCourse(query) {
  return request({
    url: '/spc/freeCourse/list',
    method: 'get',
    params: query
  })
}

// 查询公开课详细
export function getFreeCourse(id) {
  return request({
    url: '/spc/freeCourse/' + id,
    method: 'get'
  })
}

// 新增公开课
export function addFreeCourse(data) {
  return request({
    url: '/spc/freeCourse',
    method: 'post',
    data: data
  })
}

// 修改公开课
export function updateFreeCourse(data) {
  return request({
    url: '/spc/freeCourse',
    method: 'put',
    data: data
  })
}

// 删除公开课
export function delFreeCourse(id) {
  return request({
    url: '/spc/freeCourse/' + id,
    method: 'delete'
  })
}

// 导出公开课
export function exportFreeCourse(query) {
  return request({
    url: '/spc/freeCourse/export',
    method: 'get',
    params: query
  })
}