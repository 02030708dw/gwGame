


<template>
	<view class="headerTabAll">
		<view class="headerLabelAll" :style="{
			backgroundColor:item.checked ?props.backActive:'',
			'color':item.checked ?'#fff':''
			}" @click="handleActive(item.id)" v-for="(item,index) in props.typeTab" :key="index">{{item.label}} </view>
	</view>
</template>

<script setup lang="ts">
	// import { useCommon } from "@/plugins/pinia/common.pinia";
	// const storeCommon = useCommon();
	const props = defineProps(['typeTab', 'countId', 'backActive']);
	const emits = defineEmits(['handleActives'])
	const handleActive = (id : number) => {
	   emits('handleActives', id)
	}
</script>

<style scoped lang="scss">
	.headerTabAll {
		width: 94%;
		margin: 0 auto;
		margin-top: 20rpx;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 20rpx;



	}

	.headerLabelAll {
		flex: 1;
		margin: 0 10rpx;
		padding: 10rpx 0;
		text-align: center;
		background: #FFFFFF;
		border-radius: 4px;
		margin-bottom: 20rpx;
		color: #000;
	}

	.activeAll {

		border-radius: 4px;
	}
</style>