<template>
	<view class="headerTabAll">
		<view class="headerLabelAll" :style="{
			backgroundColor:item.id ==  countId ?props.backActive:'',
			'color':item.id ==  countId?'#fff':''
			}" @click="handleActive(item.id)" v-for="(item,index) in props.typeTab" :key="index">{{item.label}} </view>
	</view>
</template>

<script setup lang="ts">
	// import { useCommon } from "@/plugins/pinia/common.pinia";

	import { ref } from 'vue';

	// const storeCommon = useCommon();
	const props = defineProps(['typeTab', 'backActive']);
	const emits = defineEmits(['handleActives'])
	const countId = ref(0);

	const handleActive = (id : number) => {
		countId.value = id;
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