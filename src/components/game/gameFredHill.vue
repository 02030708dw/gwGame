<template>
	<view class="headerFred" :style="{backgroundImage: 'url('+ props.urls +')'}">
		<view class="headerFredTitle">
			Fred Hill
		</view>
		<gameTab @handleActives="handleActives" :countId="countId" :typeTab="typeTab" />
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
	import gameTab from "./gameTab.vue"
	const props = defineProps(['urls'])
	const countId = ref(1);
	/**
		 * 
		 * 类型切换
		*/
	const typeTab = reactive([
		{ label: "0", id: 0 },
		{ label: "1", id: 1 },
		{ label: "2", id: 2 },
		{ label: "3", id: 3 },
		{ label: "4", id: 4 },
		{ label: "5", id: 5 },
		{ label: "6", id: 6 },
		{ label: "7", id: 7 },
		{ label: "8", id: 8 },
		{ label: "9", id: 9 },
	])
	const handleActives = (id : number) => {
		countId.value = id
	}
</script>

<style scoped lang="scss">
	.headerFredTitle {
		font-size: 22px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		margin-top: 30rpx;
		padding-left: 20rpx;
	}

	.headerFred {
		width: 96%;
		display: flex;
		flex-direction: column;


		margin: 0 auto;
		height: 286rpx;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>