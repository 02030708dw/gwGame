<template>
	<view class="headerStyle">
		<view class="headerMore" @click="handleCountry">
			<image class="headerMoreimage" src="@/static/images/more.png" />
		</view>
		<view class="headerTitle">
			<image class="headerImg" src="@/static/images/heart.png" alt="" srcset="" />
			<view class="headerText">
				游戏列表
			</view>
			<image class="headerImg" src="@/static/images/selects.png" alt="" srcset="" />
		</view>
		<view class="headerMore">
			<image class="headerMoreimage" src="@/static/images/home.png" alt="" srcset="" />
		</view>
	</view>
	<u-action-sheet   @close="handleClose" @select="handleSelect" :actions="countryList" :title="countryTitle" :show="countryShow"></u-action-sheet>
</template>

<script setup lang="ts">
	import { useCommon } from "@/plugins/pinia/common.pinia";
import { ref } from "vue"
	const storeCommon = useCommon();
	const emits = defineEmits(['handleContry']);
	const countryTitle = ref('Select a country')
	const countryShow = ref(false) 
	const countryList = ref([

		{
			name: 'Japan',
			id: 1
		},
		{
			name: 'Malaysia', 
			id: 2
		}
	])




	const handleCountry = () => {
		countryShow.value = true
	}
	const handleClose = () => {
		countryShow.value = false
	}
	const handleSelect = (item : any) => {
		storeCommon.setTabData(item.id) 
		handleClose()
		console.log("indexindexindexindex", countryShow.value)

	}
</script>

<style scoped lang="scss">
	.headerStyle {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #333;
		padding: 40rpx;
	}

	.headerTitle {
		font-size: 32rpx;
		color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.headerText {
		margin: 0 10rpx;
	}

	.headerImg {
		width: 30rpx;
		height: 30rpx;
	}

	.headerMore {
		display: flex;
		width: 40rpx;
		height: 40rpx;

	}

	.headerMoreimage {
		display: flex;
		width: 100%;
		height: 100%;
	}
</style>