<template>
	<scroll-view :scroll-y="true" :enable-flex="true" class="chat-style">

		<view class="messageList" v-for="(items,i) in TIMStore.chatLogs" :key="i" :class="{
					  fill_in:items.flow==='in',
					  fill_out:items.flow !=='in',
					   
				  }">
			<view class="touxiang" :class="{
					  fill_in_a:items.flow==='in',
					  fill_out_a:items.flow !=='in',
					   
				  }"></view>

			<view class="touxtext" v-if="items.type==='TIMTextElem'">
				{{items.payload.text}}
			</view>
			<view class="messageTIM" v-if="items.type==='TIMImageElem'">
				<image @click="previewImages(items.payload.imageInfoArray[0].imageUrl)"
					:src="items.payload.imageInfoArray[0].imageUrl" mode="scaleToFill"></image>
			</view>
		</view>
		<uv-chat-input @sendChat="sendChat" @sendChatType="sendChatType"></uv-chat-input>

	</scroll-view>
</template>

<script lang="ts" setup>
	import uvChatInput from "@/components/chat/uv-chat-input/uv-chat-input.vue";
	// import { storeToRefs } from 'pinia'
	// let { chatLogs } = storeToRefs(TIMStore)
	import { useTIMStore } from "@/plugins/chat"
	import { useSendGetUser } from "@/plugins/TIM-plugin/sendGetUser.pinia"

	const storeSendGetUser = useSendGetUser();
	const TIMStore = useTIMStore();
 

	//发送消息
	const sendChat = (text : any) => {
		console.log('数据', text)
		// 每次发送消息就添加进去
		TIMStore.nowMessage.push({
			payload: {
				text
			},
			type: 'TIMTextElem',
			flow: 'out'
		})

		/**
		 * 给 admin发送消息，是可以动态变化的
		 * @param storeSaveTimUser.sendUser 发送者名称
		 * 
		*/
		TIMStore.timCore.sendMessage(storeSendGetUser.sendUser, { text }, 'text');

		console.log('name======', text, storeSendGetUser.sendUser)

	}

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
		console.log('把接收到的消息渲染到聊天记录里面', args[0].data)
		if (name === "subscribeMessage") {
			TIMStore.nowMessage.push(...args[0].data)
		}
	})


	const sendcreateImageMessages = () => {
		uni.chooseImage({
			count: 2,
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], // 从相册选择
			success: (res) => {

				// 每次发送消息就添加进去
				TIMStore.nowMessage.push({
					payload: {
						imageInfoArray: [{ imageUrl: res.tempFiles[0].path }]
					},
					type: 'TIMImageElem',
					flow: 'out'
				})
				TIMStore.timCore.sendMessage(storeSendGetUser.sendUser, { file: res }, 'img')

			}
		});

	}




	const previewImages = (url : string) => {
		uni.previewImage({
			urls: [url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
			current: '', // 当前显示图片的http链接，默认是第一个
			success: function (res) { },
			fail: function (res) { },
			complete: function (res) { },
		})
	}
	const sendChatType = () => {
		sendcreateImageMessages()
	}
</script>

<style lang="scss" scoped>
	@import "./css/message.scss";
</style>