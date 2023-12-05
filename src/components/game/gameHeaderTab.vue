<template>
	<view class="headerTab">
		<view class="headerLabel" @click="handleContrys(item)" v-for="(item,index) in props.typeTab" :key="index">
			{{item.label}} </view>
	</view>
</template>

<script setup lang="ts">
	import { useCommon } from "@/plugins/pinia/common.pinia"; 
	 
    const storeCommon =useCommon();
	const props = defineProps(['typeTab']);
	const emits = defineEmits(['handleContry']);
	const handleContrys = (item : any) => {
		console.log('9999-----',item)
		storeCommon.setTabData(item.id)
		// emits('handleContry', item)
	}
</script>

<style scoped lang="scss">
	.headerTab {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 20rpx 8rpx;

	}

	.headerLabel {
		background-color: #FCEFD5;
		width: 20%;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 8px;
		color: #333;
		font-size: 16px;
	}
</style>