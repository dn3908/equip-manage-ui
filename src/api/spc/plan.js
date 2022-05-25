import request from '@/utils/request'

// 查询训练计划列表
export function listPlan(query) {
  return request({
    url: '/spc/plan/list',
    method: 'get',
    params: query
  })
}

// 查询训练计划详细
export function getPlan(id) {
  return request({
    url: '/spc/plan/' + id,
    method: 'get'
  })
}

// 新增训练计划
export function addPlan(data) {
  return request({
    url: '/spc/plan',
    method: 'post',
    data: data
  })
}

// 修改训练计划
export function updatePlan(data) {
  return request({
    url: '/spc/plan',
    method: 'put',
    data: data
  })
}

// 删除训练计划
export function delPlan(id) {
  return request({
    url: '/spc/plan/' + id,
    method: 'delete'
  })
}

// 导出训练计划
export function exportPlan(query) {
  return request({
    url: '/spc/plan/export',
    method: 'get',
    params: query
  })
}