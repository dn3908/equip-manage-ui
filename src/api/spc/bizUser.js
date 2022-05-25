import request from '@/utils/request'

// 查询会员列表列表
export function listBizUser(query) {
  return request({
    url: '/spc/bizUser/list',
    method: 'get',
    params: query
  })
}

// 查询会员列表详细
export function getBizUser(userId) {
  return request({
    url: '/spc/bizUser/' + userId,
    method: 'get'
  })
}

// 新增会员列表
export function addBizUser(data) {
  return request({
    url: '/spc/bizUser',
    method: 'post',
    data: data
  })
}

// 修改会员列表
export function updateBizUser(data) {
  return request({
    url: '/spc/bizUser',
    method: 'put',
    data: data
  })
}

// 删除会员列表
export function delBizUser(userId) {
  return request({
    url: '/spc/bizUser/' + userId,
    method: 'delete'
  })
}

// 导出会员列表
export function exportBizUser(query) {
  return request({
    url: '/spc/bizUser/export',
    method: 'get',
    params: query
  })
}