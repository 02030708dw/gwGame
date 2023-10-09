<template>
	<view class="">
		<view class="bacAlipay">

			<view class="" v-for="(item,index) in TIMStore.conversationList" :key="index">
				{{item.name}}
			</view> 
			<view class="submitAlipay" @click="getAll">获取会话列表</view>

		</view>

	</view>
</template>


<script setup lang="ts">
	import {   ref } from "vue";
	// import TIMCore from "@/plugins/TIM-plugin/TIM-core"
	// import { genTestUserSig } from "@/debug/index.js"
	import { useTIMStore } from "@/plugins/chat"
	// import { onShow } from "@dcloudio/uni-app";

	const name = ref("admin") 
	const TIMStore = useTIMStore();
	TIMStore.timCore.onReady = async () => {
	 	console.log('0000000000000200000000000000000000000000')
		await TIMStore.getSessionList()
	}   
	/**
	 * 每次准备完成后调用 重写onReady方法,获取会话列表
	 ***/
	 
 
	 const getAll =  ()=>{ 
	  
	 }
		 
	 
	 
	 
</script>

<style scoped lang="scss">
	@import "./css/login.scss";
</style>