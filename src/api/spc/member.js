import request from '@/utils/request'

// 查询会员训练信息列表
export function listMember(query) {
  return request({
    url: '/spc/member/list',
    method: 'get',
    params: query
  })
}

// 查询会员训练信息详细
export function getMember(userId) {
  return request({
    url: '/spc/member/' + userId,
    method: 'get'
  })
}

// 新增会员训练信息
export function addMember(data) {
  return request({
    url: '/spc/member',
    method: 'post',
    data: data
  })
}

// 修改会员训练信息
export function updateMember(data) {
  return request({
    url: '/spc/member',
    method: 'put',
    data: data
  })
}

// 删除会员训练信息
export function delMember(userId) {
  return request({
    url: '/spc/member/' + userId,
    method: 'delete'
  })
}

// 导出会员训练信息
export function exportMember(query) {
  return request({
    url: '/spc/member/export',
    method: 'get',
    params: query
  })
}