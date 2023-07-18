import { useUserInfo } from '@/store/userInfo' 

import { HEADER, HEADERPARAMS, TOKENNAME, HTTP_REQUEST_URL } from '@/config/app'

import { showMessage } from './status' 

type RequestOptionsMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
type RequestOptionsMethodAll = RequestOptionsMethod | Lowercase<RequestOptionsMethod>

const userInfo = useUserInfo()
/**
 * 发送请求
 */
function baseRequest(
	url : string,
	method : RequestOptionsMethod,
	data : any,
	{ noAuth = false, noVerify = false } : any,
	params : unknown
) {
	const token = userInfo.Token;
	console.log("====token==========>>>>",token)
	const beasUrl = HTTP_REQUEST_URL
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
				if(res.data.code<=300&&res.data.code>=200){
					reslove(res.data)
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
	request[method] = (api : any, data : any, opt : any, params : any) => baseRequest(api, m, data, opt || {}, params)
})

export default request