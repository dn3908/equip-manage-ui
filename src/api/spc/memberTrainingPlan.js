import request from '@/utils/request'

// 查询训练计划列表
export function listMemberTrainingPlan(query) {
  return request({
    url: '/spc/memberTrainingPlan/list',
    method: 'get',
    params: query
  })
}

// 查询训练计划详细
export function getMemberTrainingPlan(id) {
  return request({
    url: '/spc/memberTrainingPlan/' + id,
    method: 'get'
  })
}

// 新增训练计划
export function addMemberTrainingPlan(data) {
  return request({
    url: '/spc/memberTrainingPlan',
    method: 'post',
    data: data
  })
}

// 修改训练计划
export function updateMemberTrainingPlan(data) {
  return request({
    url: '/spc/memberTrainingPlan',
    method: 'put',
    data: data
  })
}

// 删除训练计划
export function delMemberTrainingPlan(id) {
  return request({
    url: '/spc/memberTrainingPlan/' + id,
    method: 'delete'
  })
}

// 导出训练计划
export function exportMemberTrainingPlan(query) {
  return request({
    url: '/spc/memberTrainingPlan/export',
    method: 'get',
    params: query
  })
}