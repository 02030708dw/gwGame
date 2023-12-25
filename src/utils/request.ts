import { showMessage } from '@/utils/status';
import {HEADER, HEADERPARAMS, TOKENNAME, HTTP_REQUEST_URL, HTTP_REQUEST_URL2, HTTP_REQUEST_URL3} from '@/config/app';
import {getStorage} from "@/utils/storage";
import {UrlType} from "@/api";


type RequestOptionsMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
type RequestOptionsMethodAll = RequestOptionsMethod | Lowercase<RequestOptionsMethod>

/**
 * 发送请求
 */
function baseRequest(
	url : string,
	method : RequestOptionsMethod,
	data : any,
	{ noAuth = false, noVerify = false } : any,
	params : unknown,
	uType:UrlType
) {
	// const token = userInfo.Token;
	const token=getStorage('token')
	let beasUrl=''
	// console.log("====token==========>>>>",token)
	switch (uType) {
		case UrlType.info:
			beasUrl=HTTP_REQUEST_URL
			break;
		case UrlType.bet:
			beasUrl=HTTP_REQUEST_URL2
			break;
		case UrlType.init:
			beasUrl=HTTP_REQUEST_URL3
			break;
	}
	console.log(data)
	let header = JSON.parse(JSON.stringify(HEADER))
	if (params != undefined) {
		header = HEADERPARAMS
	}
	if (!noAuth) {
		if (!token) {
			return Promise.reject({
				msg: '未登录',
			})
		}
		if (token && token !== 'null') header[TOKENNAME] = 'Bearer ' + token
	}

	return new Promise((reslove, reject) => {
		uni.showLoading({
			title: '加载中',
			mask: true,
		})
		uni.request({
			url: beasUrl + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			dataType: 'json',
			timeout:8000,
			success: (res : any) => {
				uni.hideLoading()
				// res.data.token && res.data.token !== 'null' &&
				// store.commit('LOGIN', {
				// 	token: res.data.token,
				// })
				if (noVerify) {
					reslove(res)
					return
				} else if (res.statusCode !== 200) {
					reject(res.data.message || '系统错误')
					return
				}
				// 判断内层code
				if(res.data.resCode==='000000'){
					reslove(res.data.resultSet)
					return
				}else {
					uni.showToast({
						icon:'none',
						title:showMessage(res.data.code)
					})
					reject(res.data)
					return
				}
			},
			fail: (msg) => {
				uni.hideLoading()
				reject('请求失败')
				return
			},
		})
		
	})
}
 
const requestOptions : RequestOptionsMethodAll[] = [
	'options',
	'get',
	'post',
	'put',
	'head',
	'delete',
	'trace',
	'connect',
]
type Methods = typeof requestOptions[number]
const request : { [key in Methods]?: Function } = {}

requestOptions.forEach((method) => {
	const m = method.toUpperCase() as unknown as RequestOptionsMethod
	request[method] = (api : any, data : any, opt : any, params : any,uType:UrlType) => baseRequest(api, m, data, opt || {}, params,uType)
})

export default request