import request from '@/utils/request'

// 查询会员身高变化列表
export function listMemberHeightHistory(query) {
  return request({
    url: '/spc/memberHeightHistory/list',
    method: 'get',
    params: query
  })
}

// 查询会员身高变化详细
export function getMemberHeightHistory(id) {
  return request({
    url: '/spc/memberHeightHistory/' + id,
    method: 'get'
  })
}

// 新增会员身高变化
export function addMemberHeightHistory(data) {
  return request({
    url: '/spc/memberHeightHistory',
    method: 'post',
    data: data
  })
}

// 修改会员身高变化
export function updateMemberHeightHistory(data) {
  return request({
    url: '/spc/memberHeightHistory',
    method: 'put',
    data: data
  })
}

// 删除会员身高变化
export function delMemberHeightHistory(id) {
  return request({
    url: '/spc/memberHeightHistory/' + id,
    method: 'delete'
  })
}

// 导出会员身高变化
export function exportMemberHeightHistory(query) {
  return request({
    url: '/spc/memberHeightHistory/export',
    method: 'get',
    params: query
  })
}