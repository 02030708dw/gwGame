<template>
	<xuanzhuan/>
	
	
	
	01 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 D0 E8 
	
	
	
	00 03 02 00 00 05 BA 00 77 0A 3C 00 00 00 00 00 00 00 98 46
	
	01--->执行中
	02--->执行完毕
	
	
	
	
	
	
	
	
	
	
	<!-- <view class="">
		<view class="bacAlipay">

			<u-form ref="uForm">
				<u-form-item>
					<u-input class="inputLogin" v-model="name" placeholder="请输入账号" border="none" />
				</u-form-item>
				<u-form-item>
					<u-input class="inputLogin" placeholder="请输入验证码" v-model="psw" type="text" border="none"></u-input>
				</u-form-item>

			</u-form>
			<view @click="submit" class="submitAlipay">登录</view>
			<view @click="loginOut" class="submitAlipay">退出登录</view>
		</view>

	</view> -->
</template>


<script setup lang="ts">
	import { ref } from "vue"; 
	import xuanzhuan from "@/components/xuanzhuan/index.vue"
	import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"
	import { configTim } from "@/plugins/TIM-plugin/configTim"

	const name = ref("")
	const psw = ref("")
	const TIMStore = useTIMStore()
	const submit = async () => {
		/**
		 * admin登录是客服，非admin登录的是客户
         * 生成秘钥
		 * 
		**/
		const { userSig } = genTestUserSig({
			userID: name.value,
			SDKAppID: configTim.SDKAppID,
			secretKey:configTim.secretKey 

		})
		await getUserSig(userSig)
	}
	const getUserSig = async (userSig : string) => {
		await TIMStore.timCore.timLogin({
			userSig,
			userID: name.value,
		})
		// 跳转到聊天页面
		nextTo()
	}
	const nextTo = async () => {
		uni.navigateTo({
			url: '/pageTim/messageUsers'
		})
		 
	}
	const loginOut = () => {
		TIMStore.timCore.timLoginOut();
	}
	// 退出登录的时候调用
	// TIMStore.timCore.timLoginOut();
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>