<template>
	<view class="headerTime">
		<view class="headerTimeL">
			<view class="fontColor1 f24"> 00:23</view>
			<view class="f12"> 0023-9282</view>
		</view>
		<view class="headerTimeC">
			<view class="f33"> 27636776|4423|4423|4423</view>
			<view class="f12 margintop40"> 0023-9282</view>
		</view>
		<view class="headerTimeR">
			 <image  src="../../static/images/tiancong.png" mode=""></image>
			 <image class="headerImg" src="../../static/images/jifei.png" mode=""></image>
			 <image src="../../static/images/jishi.png" mode=""></image>
		</view>
	</view>
	 
</template>

<script setup lang="ts">
 
	const props = defineProps(['typeTab'])
</script>

<style scoped lang="scss">
	.headerTime {
		width: 96%;
		display: flex;
		flex-direction: row;
		// align-items: center;
		// justify-content: space-between;
		 
		margin: 0 auto;
		padding: 30rpx 0;
	}
	.headerTimeL{
		border-right: 1px solid #F9F9F9;
		width: 25%;
	}
	.headerTimeC{
		margin-left: 50rpx;
	}
	.margintop40{
		margin-top: 30rpx;
	}
	.headerTimeR{ 
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		image{
			width: 34rpx;
			height: 34rpx;
		}
		.headerImg{
			margin: 0 30rpx;
		}
	}
</style>