<template>
	<view class="">
		<view class="bacAlipay">

			<u-form ref="uForm">
				<u-form-item>
					<u-input class="inputLogin" maxlength="11" v-model="name" placeholder="请输入手机号" border="none" />
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
	// import TIMCore from "@/plugins/TIM-plugin/TIM-core"
	import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"

	const name = ref("admin")
	const psw = ref("")
	const TIMStore = useTIMStore()
	const submit = async () => {
		/**
		 * 生成秘钥
		 * 
		**/
		const { userSig } = genTestUserSig({
			userID: name.value,
			SDKAppID: 1600004995,
			secretKey: '83e594d500af68d914cd7af88eecd620d00e810f2a03417c7469aacefd627bef',

		})
	await	getUserSig(userSig)
		//data =  SDKAppID  userSig
		// console.log('userSig>>>>>>>',userSig)
		// console.log('name.value>>>>>>>',name.value)
		//   storeTIMStore.timCore.timLogin({
		// 	userSig,
		// 	userID: name.value,

		// })

	}

	const getUserSig = async (userSig : any) => {
		// console.log('name.value>>>>>>>', userSig)
		 await TIMStore.timCore.timLogin({
			userSig,
			userID: name.value,
		})

	}
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>