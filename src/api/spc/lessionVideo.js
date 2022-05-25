import request from '@/utils/request'

// 查询小节视频列表
export function listLessionVideo(query) {
  return request({
    url: '/spc/lessionVideo/list',
    method: 'get',
    params: query
  })
}

// 查询小节视频详细
export function getLessionVideo(id) {
  return request({
    url: '/spc/lessionVideo/' + id,
    method: 'get'
  })
}

// 新增小节视频
export function addLessionVideo(data) {
  return request({
    url: '/spc/lessionVideo',
    method: 'post',
    data: data
  })
}

// 修改小节视频
export function updateLessionVideo(data) {
  return request({
    url: '/spc/lessionVideo',
    method: 'put',
    data: data
  })
}

// 删除小节视频
export function delLessionVideo(id) {
  return request({
    url: '/spc/lessionVideo/' + id,
    method: 'delete'
  })
}

// 导出小节视频
export function exportLessionVideo(query) {
  return request({
    url: '/spc/lessionVideo/export',
    method: 'get',
    params: query
  })
}