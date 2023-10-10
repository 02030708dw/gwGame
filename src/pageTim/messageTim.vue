<template>
	<view class="">获取消息
		<view class="bacAlipay">

			<u-form ref="uForm">
				<u-form-item>
					<u-input class="inputLogin" type="textarea" v-model="name" placeholder="请输入" />
				</u-form-item>


			</u-form>
			<view @click="sendMsg" class="submitAlipay">发送</view>
			<view @click="messageTimList" class="submitAlipay">获取</view>
			<view @click="loginOut" class="submitAlipay">退出登录</view>
			<view @click="deleteSession" class="submitAlipay">删除回话</view>

		</view>

	</view>
</template>


<script setup lang="ts">
	import { ref } from "vue";
	// import TIMCore from "@/plugins/TIM-plugin/TIM-core"
	// import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"

	const name = ref("admin")
	const psw = ref("")
	const TIMStore = useTIMStore();

	/**
	 * 订阅SDK 接收功能 
	 * 
	 */
	TIMStore.timCore.messageReceived = (event) => {
		/**
		 * 保存在pinia里面
		 * 
		*/
		TIMStore.subscribeMessage(event)
	}
	/**
	 * 发送消息
	 * 
	*/
	const sendMsg = () => {
		/**
		 * 给 admin发送消息，是可以动态变化的
		 * 
		*/
		TIMStore.timCore.sendMessage('冉先生', { text: name.value });
		// 每次发送消息就添加进去
		TIMStore.nowMessage.push({
			payload: {
				text: name.value
			},
			flow: 'out'
		})
		// push完了清空数据
		name.value = ''
		// console.log('name======', name.value)
	}
	const messageTimList = () => {
		uni.navigateTo({
			url: "/pageTim/messageTimList"
		})
	}
	const loginOut = () => {
		TIMStore.timCore.timLoginOut();
	}
	const deleteSession = async () => {
		await TIMStore.deleteSessionConversation()

	}
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>