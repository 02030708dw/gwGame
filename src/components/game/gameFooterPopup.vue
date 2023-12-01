<template>
 <view class="bettingInput7">
		<view class="bettingInput8">
			<view class="bettingInput3">
				<u-input class="bettingI" border="none" v-model="storeCreactGame.price" placeholder="10"></u-input>
				<text class="bettingT">Tmis</text>
			</view>
			<view class="bettingIIs bettingIIsCenter">
				<u-input class="bettingII" border="none"   placeholder="Condinm"></u-input>
			</view>
		</view>
		<view class="headerStyles1">
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

	</view>


</template>

<script setup lang="ts">
	import { useGame } from "@/plugins/pinia/Game.pinia";
	import { useCreactGame } from "@/plugins/pinia/CreactGame.pinia";
	const storeGame = useGame()
	const storeCreactGame = useCreactGame()
	const handleBetting = () => {
		storeCreactGame.addHistoryList()
		storeGame.isBetting = !storeGame.isBetting;
		uni.showToast({
			title:"投注成功"
		})
		 
	}
</script>

<style scoped lang="scss">
	.footerleft0 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.headerStyles1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		height: 96rpx;

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

	.bettingInput3 {
		width: 290rpx;
		height: 44rpx;
		border: 1px solid #EFEFEF;
		border-radius: 0px 8rpx 8rpx 0px;
		padding: 4rpx;
		text-indent: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.bettingT {
		width: 82rpx;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		background: #EFEFEF;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: 12px;
		color: #999;
	}

	.bettingInput7 {
		background-color: #FFFFFF;
		padding-top: 30rpx;
		margin-top: 20rpx;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.bettingInput8 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.bettingIIs {
		width: 82px;
		height: 23px;
		line-height: 23px;
		text-align: center;
		margin-left: 10%;
	}

	.bettingII {
		display: flex;
		background: #FFFFFF;
		border-radius: 4px;
		border: 1px solid #EFEFEF;
	}

	:deep(.uni-input-wrapper) {
		text-align: center;
	}
</style>