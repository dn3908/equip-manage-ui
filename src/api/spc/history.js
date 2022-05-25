import request from '@/utils/request'

// 查询会员体重变化列表
export function listHistory(query) {
  return request({
    url: '/spc/history/list',
    method: 'get',
    params: query
  })
}

// 查询会员体重变化详细
export function getHistory(id) {
  return request({
    url: '/spc/history/' + id,
    method: 'get'
  })
}

// 新增会员体重变化
export function addHistory(data) {
  return request({
    url: '/spc/history',
    method: 'post',
    data: data
  })
}

// 修改会员体重变化
export function updateHistory(data) {
  return request({
    url: '/spc/history',
    method: 'put',
    data: data
  })
}

// 删除会员体重变化
export function delHistory(id) {
  return request({
    url: '/spc/history/' + id,
    method: 'delete'
  })
}

// 导出会员体重变化
export function exportHistory(query) {
  return request({
    url: '/spc/history/export',
    method: 'get',
    params: query
  })
}