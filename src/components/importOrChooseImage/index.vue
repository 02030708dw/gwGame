<template>

	<view @click="chooseImage">
		<slot name="upload"></slot> 
	</view>

</template>

<script>
	import {
		HTTP_REQUEST_URL
	} from "@/config/app.ts"
	import { useUserInfo } from '@/store/userInfo' 
	export default {
	 
		setup(props, {
			emit
		}) {
			const userInfo=useUserInfo()
			const goToPage = (uri) => {
				uni.navigateTo({
					url: uri
				})
			}
			const chooseImage = (params) => {
				uni.chooseImage({
					count: 1000,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera', 'album'], //调用原生相册和原生相机，弹出选择
					// sourceType:['album'], 直接调用原生相册
					// sourceType:['camera'], 直接调用原生相机
					success: (res) => {
						// imagepath.value = res.tempFilePaths[0]

						uni.uploadFile({
							url: `${HTTP_REQUEST_URL}/sso/upload`,
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								file: res.tempFilePaths[0],
								token:'Bearer ' + userInfo.Token
							},
							header: {
								token:'Bearer ' + userInfo.Token
							},
							success: (uploadFileRes) => {
								let ques = JSON.parse(uploadFileRes.data).result
								emit("changeList", {
									url: ques 
								})
							}
						});
					}
				})
			}
			return {
				goToPage,
				chooseImage
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>