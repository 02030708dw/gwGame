<template>
	<uv-upload
		:fileList="fileList1"
		name="1"
		multiple 
		:maxCount="10"
		@afterRead="afterRead" 
		@delete="deletePic" 
	></uv-upload>
</template>
<script>
	import { HTTP_REQUEST_URL } from "@/config/app"
	export default {
		data() {
			return {
				fileList1: []
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const results = await this.uploadFilePromise(lists[i].url);
					
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: results
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: `${HTTP_REQUEST_URL}/sso/upload`, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							// console.log('==============>>>>>>>>>>>>>>',JSON.parse(res.data).result);
							let list=[];list.push(JSON.parse(res.data).result)
							this.$emit("getImgList",list )
							setTimeout(() => {
								resolve(JSON.parse(res.data).result)
							}, 1000)
						}
					});
				})
			}
		}
	}
</script>