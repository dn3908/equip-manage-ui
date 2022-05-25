import request from '@/utils/request'

// 查询会员收藏记录列表
export function listMark(query) {
  return request({
    url: '/spc/mark/list',
    method: 'get',
    params: query
  })
}

// 查询会员收藏记录详细
export function getMark(id) {
  return request({
    url: '/spc/mark/' + id,
    method: 'get'
  })
}

// 新增会员收藏记录
export function addMark(data) {
  return request({
    url: '/spc/mark',
    method: 'post',
    data: data
  })
}

// 修改会员收藏记录
export function updateMark(data) {
  return request({
    url: '/spc/mark',
    method: 'put',
    data: data
  })
}

// 删除会员收藏记录
export function delMark(id) {
  return request({
    url: '/spc/mark/' + id,
    method: 'delete'
  })
}

// 导出会员收藏记录
export function exportMark(query) {
  return request({
    url: '/spc/mark/export',
    method: 'get',
    params: query
  })
}