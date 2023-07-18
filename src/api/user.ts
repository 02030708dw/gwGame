import request from '@/utils/request'
// 处理url方法
import {disposeUrl} from '@/utils/tools'
 // 发送短信验证码
export function fetchUserInfo(data:any) {
	let url = disposeUrl('/login/sendmessage',data)
	return request?.post?.(url, data, { noAuth: true })
}
// 短信登录
export function ruquestSmsLogin(data:any){
	let url = disposeUrl('/login/smslogin',data)
	return request?.post?.(url,data,{ noAuth: true })
} 
 
// 获取用户信息
export function ruquestGetUserInfo(){
	console.log('执行get')
	return request?.get?.('/login/getInfo')
} 

  
// export function contactslist(data:any){
// 	let url = disposeUrl('/contacts/list',data)
// 	return request?.post?.(url,data,{ noAuth: true })
// } 
 
export function contactslist(data : any) {
	return request?.get?.('/contacts/list', data, { noAuth: false })
}

export function scanPlaceCode(data : any) {
	return request?.get?.('/v1/place/scan-place-code', data, { noAuth: false })
}

 