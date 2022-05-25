import request from '@/utils/request'

// 查询会员体重变化列表
export function listMemberWeightHistory(query) {
  return request({
    url: '/spc/memberWeightHistory/list',
    method: 'get',
    params: query
  })
}

// 查询会员体重变化详细
export function getMemberWeightHistory(id) {
  return request({
    url: '/spc/memberWeightHistory/' + id,
    method: 'get'
  })
}

// 新增会员体重变化
export function addMemberWeightHistory(data) {
  return request({
    url: '/spc/memberWeightHistory',
    method: 'post',
    data: data
  })
}

// 修改会员体重变化
export function updateMemberWeightHistory(data) {
  return request({
    url: '/spc/memberWeightHistory',
    method: 'put',
    data: data
  })
}

// 删除会员体重变化
export function delMemberWeightHistory(id) {
  return request({
    url: '/spc/memberWeightHistory/' + id,
    method: 'delete'
  })
}

// 导出会员体重变化
export function exportMemberWeightHistory(query) {
  return request({
    url: '/spc/memberWeightHistory/export',
    method: 'get',
    params: query
  })
}