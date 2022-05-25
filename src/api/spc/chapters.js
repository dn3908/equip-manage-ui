import request from '@/utils/request'

// 查询课程章节列表
export function listChapters(query) {
  return request({
    url: '/spc/chapters/list',
    method: 'get',
    params: query
  })
}

// 查询课程章节详细
export function getChapters(id) {
  return request({
    url: '/spc/chapters/' + id,
    method: 'get'
  })
}

// 新增课程章节
export function addChapters(data) {
  return request({
    url: '/spc/chapters',
    method: 'post',
    data: data
  })
}

// 修改课程章节
export function updateChapters(data) {
  return request({
    url: '/spc/chapters',
    method: 'put',
    data: data
  })
}

// 删除课程章节
export function delChapters(id) {
  return request({
    url: '/spc/chapters/' + id,
    method: 'delete'
  })
}

// 导出课程章节
export function exportChapters(query) {
  return request({
    url: '/spc/chapters/export',
    method: 'get',
    params: query
  })
}