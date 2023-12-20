const baseURL=""
// // 配置拦截器
const httpInterceptor={
	// 拦截前触发
	invoke(options:any){
		if(!options.url.startsWith('http')){
			options.url=baseURL+options.url
		}
		options.timeout=10000
		options.header={
			...options.header,
			'source-client': 'miniapp',
			"Authorization":uni.getStorageSync('usertoken')
		}
	},
}

// 添加拦截器
uni.addInterceptor('request',httpInterceptor)

const http=(options:any)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			...options,
			success(res){
				resolve(res.data)
			},
			fail(res){
				uni.showToast({
					icon:'none',
					title:"网络错误"
				})
				reject(res)
			}
		}) 
	})
}
export { http }