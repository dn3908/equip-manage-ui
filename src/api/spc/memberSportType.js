import request from '@/utils/request'

// 查询会员运动类型数据关联列表
export function listMemberSportType(query) {
  return request({
    url: '/spc/memberSportType/list',
    method: 'get',
    params: query
  })
}

// 查询会员运动类型数据关联详细
export function getMemberSportType(id) {
  return request({
    url: '/spc/memberSportType/' + id,
    method: 'get'
  })
}

// 新增会员运动类型数据关联
export function addMemberSportType(data) {
  return request({
    url: '/spc/memberSportType',
    method: 'post',
    data: data
  })
}

// 修改会员运动类型数据关联
export function updateMemberSportType(data) {
  return request({
    url: '/spc/memberSportType',
    method: 'put',
    data: data
  })
}

// 删除会员运动类型数据关联
export function delMemberSportType(id) {
  return request({
    url: '/spc/memberSportType/' + id,
    method: 'delete'
  })
}

// 导出会员运动类型数据关联
export function exportMemberSportType(query) {
  return request({
    url: '/spc/memberSportType/export',
    method: 'get',
    params: query
  })
}