<template>
	<view class="">
		<view class="bacAlipay">

			<u-form ref="uForm">
				<u-form-item>
					<u-input class="inputLogin" type="textarea" v-model="name" placeholder="请输入" />
				</u-form-item>


			</u-form>
			<view @click="sendMsg" class="submitAlipay">发送</view>

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
		TIMStore.timCore.sendMessage('admin', { text: name.value })
		// console.log('name======', name.value)
	}
	/**
	 * 每次准备完成后调用 重写onReady方法,获取会话列表
	 ***/ 
	TIMStore.timCore.onReady=()=>{
		TIMStore.getConversationList()
	}
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>