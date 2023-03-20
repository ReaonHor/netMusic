import {baseUrl} from './config.js'

//首页api
export function toplist() {
	return new Promise(function(reslove,reject){
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			data: {},
			success: res => {
				let result = res.data.list;
				result.length = 4;
				reslove(result);
			},
			fail: () => {},
			complete: () => {}
		});
	}) 	
}

//歌单
export function list(id) {
	return uni.request({
		url: `${baseUrl}/top/list?id=${id}`,
		method: 'GET',
	});
}
//歌曲信息

export function songDetail(songid) {
	return uni.request({
		url: `${baseUrl}/song/detail?ids=${songid}`,
		method: 'GET',
		data: {}
	});
}

//歌词
export function songLyric(songid) {
	return uni.request({
		url: `${baseUrl}/lyric?id=${songid}`,
		method: 'GET',
		data: {},

	});
}

//歌曲音源
export function songData(songid) {
	return uni.request({
			url: `${baseUrl}/song/url?id=${songid}`,
			method: 'GET',
			data: {},
	
		});
	}


//推荐歌曲
export function songSimi(songid) {
	return uni.request({
			url: `${baseUrl}/simi/song?id=${songid}`,
			method: 'GET',
			data: {},
	
		});
	}

//评论
export function songComment(songid) {
	return uni.request({
			url: `${baseUrl}/comment/hot?id=${songid}&type=0&limit=10`,
			method: 'GET',
			data: {}
		});
	}

//热搜
export function searchHot() {
	return uni.request({
			url: `${baseUrl}/search/hot/detail`,
			method: 'GET',
			
		});
	}
	
//搜索提示
export function searchSuggest(word) {
	return uni.request({
			url: `${baseUrl}/search?keywords=${word}&type=mobile`,
			method: 'GET',
		});
	}
	
//搜索结果
export function searchResult(word) {
	return uni.request({
			url: `${baseUrl}/search?keywords=${word}`,
			method: 'GET',
		});
	}