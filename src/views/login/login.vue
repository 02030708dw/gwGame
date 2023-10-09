<template>
	<view class="">
		<view class="bacAlipay">

			<u-form ref="uForm">
				<u-form-item>
					<u-input class="inputLogin" v-model="name" placeholder="请输入手机号" border="none" />
				</u-form-item>
				<u-form-item>
					<u-input class="inputLogin" placeholder="请输入验证码" v-model="psw" type="text" border="none"></u-input>
				</u-form-item>

			</u-form>
			<view @click="submit" class="submitAlipay">登录</view>

		</view>

	</view>
</template>


<script setup lang="ts">
	import { ref } from "vue"; 
	import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"
	import { configTim } from "@/plugins/TIM-plugin/configTim"

	const name = ref("297092")
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
			url: '/pageTim/messageTim'
		})
		 
	}
	
	// 退出登录的时候调用
	// TIMStore.timCore.timLoginOut();
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>