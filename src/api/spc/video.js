import request from '@/utils/request'

// 查询视频素材列表
export function listVideo(query) {
  return request({
    url: '/spc/video/list',
    method: 'get',
    params: query
  })
}

// 查询视频素材列表
export function allVideo() {
  return request({
    url: '/spc/video/findAll',
    method: 'get',
  })
}
// 查询视频素材详细
export function getVideo(id) {
  return request({
    url: '/spc/video/' + id,
    method: 'get'
  })
}

// 新增视频素材
export function addVideo(data) {
  return request({
    url: '/spc/video',
    method: 'post',
    data: data
  })
}

// 修改视频素材
export function updateVideo(data) {
  return request({
    url: '/spc/video',
    method: 'put',
    data: data
  })
}

// 删除视频素材
export function delVideo(id) {
  return request({
    url: '/spc/video/' + id,
    method: 'delete'
  })
}

// 导出视频素材
export function exportVideo(query) {
  return request({
    url: '/spc/video/export',
    method: 'get',
    params: query
  })
}

// 查询标签列表
export function listTag() {
  return request({
    url: '/spc/tag/listTag',
    method: 'get',
  })
}

// 回显数据字典
export function selectVideoLabel(datas, value) {
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].videoId == ('' + value)) {
			actions.push(datas[key].videoName);
			return true;
		}
	})
	return actions.join('');
}