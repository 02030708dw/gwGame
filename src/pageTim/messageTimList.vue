<template>
	<view class="">
		<view class="bacAlipay">
			<view class="">
				<view class="" v-for="(item,index) in TIMStore.conversationList" :key="index">
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
	// import { onShow } from "@dcloudio/uni-app";

	const TIMStore = useTIMStore();


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
		await TIMStore.getMessageHistoryList("冉先生")
	}
	/**
		 * 把接收到的消息渲染到聊天记录里面
		 ***/
	TIMStore.$onAction(({ name, args }) => {
		if (name === "subscribeMessage") {
			TIMStore.nowMessage.push(...args[0].data)
		}
	})
</script>

<style scoped lang="scss">
	.bacAlipay {
		display: flex;
		flex-direction: row;
		// align-items: center;
		justify-content: space-between;
	}

	.bacAlipay2 {
		width: 500upx;
		background-color: #ccc;
		height: 70vh;
		display: flex;
		flex-direction: column;
	}

	.triangle {
		color: red;
	}

	.fill_tow {
		color: blue;
	}
</style>