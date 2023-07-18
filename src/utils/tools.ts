// 处理请求post请求url,
// 因为post接口中所有请求的参数都在url中携带
export function disposeUrl (url:string,data:any){
	let exUrl=url+'?'
	for(let key in data){
		exUrl+=`${key}=${data[key]}&`
	}
	exUrl = exUrl.slice(0,-1)
	return exUrl
}

// 因为后端需要传递日志的创建/更改时间，所以需要将时间处理为指定格式
export function disposeTime (){
	const time = new Date()
	const reg = /\//g
	const createTime = time.toLocaleDateString().replace(reg,'-')+' '+time.toTimeString().split(' ')[0]
	console.log(createTime)
	return createTime
}