<template>
	<scroll-view :scroll-y="true" :enable-flex="true" class="chat-style">

		<view class="messageList" v-for="(items,i) in chatLogs" :key="i" :class="{
					  fill_in:items.flow==='in',
					  fill_out:items.flow !=='in',
					   
				  }">
			<view class="touxiang"></view>
			<view class="touxtext">
				{{items.payload.text}}
			</view>

		</view>
		<uv-chat-input @sendChat="sendChat"></uv-chat-input>

	</scroll-view>
</template>

<script lang="ts" setup>
	import { ref, computed } from "vue";
	import uvChatInput from "@/components/chat/uv-chat-input/uv-chat-input.vue";

	import { useTIMStore } from "@/plugins/chat"
	import { useSendGetUser } from "@/plugins/TIM-plugin/sendGetUser.pinia"

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
		// payloadText.value = ''
		console.log('name======', payloadText.value, storeSendGetUser.sendUser)
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

	const sendChat = (text : any) => {
		payloadText.value = text;
		//发送消息
		sendMsg();
		console.log('text', text)
	}
</script>

<style lang="scss" scoped>
	@import "./css/message.scss";
</style>