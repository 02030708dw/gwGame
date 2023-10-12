<template>
	<scroll-view :scroll-y="true" :enable-flex="true" class="chat-style">

		<view class="chat-style-list" @click="handleSendMessage(item)" v-for="(item,index) in TIMStore.conversationList" :key="index">
			 <view class="avers">
			 	
			 </view> 
			 <view class="aversTitle">
			 	 <view class="aversTitles textEllipsis">{{item.lastMessage.fromAccount}} </view>
			 	 <view class="aversTitles2 textEllipsis">{{item.lastMessage.payload.text}} </view>
			 </view>
		</view>

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
 console.log(TIMStore.conversationList,'TIMStore.conversationList')


	TIMStore.timCore.onReady = async () => {
		// 获取那些人给我发了消息
		await TIMStore.getSessionList()
		// 获取对应人（冉先生）的历史记录
		await TIMStore.getMessageHistoryList(storeSendGetUser.sendUser)
	}
	/**
	 * 设置像谁发送消息
	 * 同时调用当前人的历史消息
	*/
	const handleSendMessage = async (item : any) => {
		console.log('设置像谁发送消息', item.lastMessage.fromAccount)
		storeSendGetUser.sendUser = item.lastMessage.fromAccount
       uni.navigateTo({
       	url:'/pageTim/message'
       })
		// 获取对应人（冉先生）的历史记录
		// await TIMStore.getMessageHistoryList(storeSendGetUser.sendUser)
	}
</script>

<style lang="scss" scoped>
	@import "./css/messageUsers.scss";
	 
</style>