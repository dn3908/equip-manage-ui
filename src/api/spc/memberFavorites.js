import request from '@/utils/request'

// 查询会员课程收藏列表
export function listMemberFavorites(query) {
  return request({
    url: '/spc/memberFavorites/list',
    method: 'get',
    params: query
  })
}

// 查询会员课程收藏详细
export function getMemberFavorites(id) {
  return request({
    url: '/spc/memberFavorites/' + id,
    method: 'get'
  })
}

// 新增会员课程收藏
export function addMemberFavorites(data) {
  return request({
    url: '/spc/memberFavorites',
    method: 'post',
    data: data
  })
}

// 修改会员课程收藏
export function updateMemberFavorites(data) {
  return request({
    url: '/spc/memberFavorites',
    method: 'put',
    data: data
  })
}

// 删除会员课程收藏
export function delMemberFavorites(id) {
  return request({
    url: '/spc/memberFavorites/' + id,
    method: 'delete'
  })
}

// 导出会员课程收藏
export function exportMemberFavorites(query) {
  return request({
    url: '/spc/memberFavorites/export',
    method: 'get',
    params: query
  })
}