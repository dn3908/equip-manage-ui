import request from '@/utils/request'

// 查询会员课程学习记录列表
export function listRecord(query) {
  return request({
    url: '/spc/record/list',
    method: 'get',
    params: query
  })
}

// 查询会员课程学习记录详细
export function getRecord(id) {
  return request({
    url: '/spc/record/' + id,
    method: 'get'
  })
}

// 新增会员课程学习记录
export function addRecord(data) {
  return request({
    url: '/spc/record',
    method: 'post',
    data: data
  })
}

// 修改会员课程学习记录
export function updateRecord(data) {
  return request({
    url: '/spc/record',
    method: 'put',
    data: data
  })
}

// 删除会员课程学习记录
export function delRecord(id) {
  return request({
    url: '/spc/record/' + id,
    method: 'delete'
  })
}

// 导出会员课程学习记录
export function exportRecord(query) {
  return request({
    url: '/spc/record/export',
    method: 'get',
    params: query
  })
}