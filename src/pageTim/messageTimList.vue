<template>
	<view class="bacAlipayBac">
		<view class="bacAlipay">
			<view class="bacAlipay1">
				<view class="" @click="handleSendMessage(item)" v-for="(item,index) in TIMStore.conversationList"
					:key="index">
					{{item.lastMessage.fromAccount}}
				</view>
			</view>
			<view class="bacAlipay2">
				<view v-for="(items,i) in chatLogs" :key='i' :class="{
						  triangle:items.flow==='in',
						  fill_tow:items.flow !=='in',
					  }">
					{{items.payload.text}}
				</view>
				<u-form ref="uForm">
					<u-form-item>
						<u-input class="inputLogin" type="textarea" v-model="payloadText" placeholder="请输入" />
					</u-form-item>


				</u-form>
				<view @click="sendMsg" class="submitAlipay">发送</view>
			</view>
			<!-- <view class="submitAlipay" @click="getAll">获取会话列表</view> -->

		</view>

	</view>
</template>


<script setup lang="ts">
	import { ref, computed } from "vue";
	// import TIMCore from "@/plugins/TIM-plugin/TIM-core"
	// import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"
	// import { useSaveTimUser } from "@/plugins/TIM-plugin/loginParams.pinia"
	import { useSendGetUser } from "@/plugins/TIM-plugin/sendGetUser.pinia"

	// const storeSaveTimUser = useSaveTimUser();
	const storeSendGetUser = useSendGetUser();
	const TIMStore = useTIMStore();
	const payloadText = ref('')
	/**
	 * 发送消息
	 * 
	*/
	const sendMsg = () => {
		/**
		 * 给 admin发送消息，是可以动态变化的
		 * @param storeSaveTimUser.sendUser 发送者名称
		 * 
		*/
		TIMStore.timCore.sendMessage(storeSendGetUser.sendUser, { text: payloadText.value });
		// 每次发送消息就添加进去
		TIMStore.nowMessage.push({
			payload: {
				text: payloadText.value
			},
			flow: 'out'
		})
		// push完了清空数据
		payloadText.value = ''
		// console.log('name======', name.value)
	}



	//当前消息 和历史消息
	const chatLogs = computed(() => {
		return [
			...TIMStore.historyMessage,
			...TIMStore.nowMessage
		]
	})


	TIMStore.timCore.onReady = async () => {
		// 获取那些人给我发了消息
		await TIMStore.getSessionList()
		// 获取对应人（冉先生）的历史记录
		await TIMStore.getMessageHistoryList(storeSendGetUser.sendUser)
	}
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
		 * 把接收到的消息渲染到聊天记录里面
		 ***/
	TIMStore.$onAction(({ name, args }) => {
		// console.log('把接收到的消息渲染到聊天记录里面',args[0].data)
		if (name === "subscribeMessage") {
			TIMStore.nowMessage.push(...args[0].data)
		}
	})
	/**
	 * 设置像谁发送消息
	 * 同时调用当前人的历史消息
	*/
	const handleSendMessage = async (item : any) => {
		console.log('设置像谁发送消息', item.lastMessage.fromAccount)
		storeSendGetUser.sendUser = item.lastMessage.fromAccount

		// 获取对应人（冉先生）的历史记录
		// await TIMStore.getMessageHistoryList(storeSendGetUser.sendUser)
	}
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
     .bacAlipayBac{
		 background-color: #f5f5f5;
	 }
	.bacAlipay {
		// width: 740upx;
		display: flex;
		flex-direction: row;
		
		// align-items: center;
		justify-content: space-between;
	}
   .bacAlipay1{
	   width: 20%;
	   background-color: #ccc;
   }
	.bacAlipay2 {
		 width: 80%;
		background-color: #ccc;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.triangle {
		color: red;
		background-color: aliceblue;
		width: 70%;

	}

	.fill_tow {
		color: #000;
		text-align: right;
		background-color: #fff;
		
	}
</style>