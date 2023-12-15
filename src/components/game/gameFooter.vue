<template>
	<view class="headerStyles">
		<view class="footerleft0">
			<image class="footerleft" src="@/static/images/footerleft.png" />
			<view class="titleLeft">27,973.00</view>
			<u-icon name="arrow-right" color="#999" size="16"></u-icon>

		</view>

		<view class="headerMores">
			<image class="headerMoreimage1" src="@/static/images/footerq1.png" alt="" srcset="" />
			<image class="headerMoreimage1" src="@/static/images/footerq2.png" alt="" srcset="" />
			<view class="touzhu" @click="handleBetting">
				投注
			</view>
		</view>

	</view>


</template>

<script setup lang="ts">
	import { useGame } from "@/plugins/pinia/Game.pinia";
	const storeGame = useGame()
	const handleBetting = () => {
		storeGame.isBetting = !storeGame.isBetting
	}
</script>

<style scoped lang="scss">
	.footerleft0 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.headerStyles {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		height: 96rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.headerTitle {
		font-size: 32rpx;
		color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.titleLeft {
		font-size: 16px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
	}

	.headerText {
		margin: 0 10rpx;
	}

	.headerImg {
		width: 30rpx;
		height: 30rpx;
	}

	.headerMores {
		display: flex;
		flex-direction: row;
		justify-content: center;


	}

	.footerleft {
		width: 64rpx;
		height: 50rpx;
		margin-right: 10rpx;
	}

	.headerMoreimage1 {
		display: flex;
		width: 29px;
		height: 29px;
		margin-right: 30rpx;
	}

	.touzhu {
		width: 76px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background: #FFB023;
		border-radius: 4px;
		font-size: 22px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
	}
</style>