<template>
	<view class="">
		<view class="color1">
			1111
		</view>

		<view class="color2">
			<view class="upl">
				1
			</view>
			<view class="us">
				2
			</view>
		</view>

	</view>

</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
	* {
		margin: 0;
        padding: 0;
	}

	.color1 {
		color: blue;
		font-weight: bold;//字体加粗
		text-align: right;//文字对其方式
		border-bottom: 1upx solid orange;//容器底部边框
		background-color: red;//容器背景色
		padding-bottom: 20upx;
		padding-top: 20upx;

	}
   .color2 {
		display: flex;
		flex-direction: row; //父容器让子容器左右排列
		justify-content: space-between;
		align-items: center;//让容器对齐
		margin-top: 20upx;
	}

	.upl {
		background-color: red;
		width: 48%;
		height: 100upx;
		line-height: 100upx; 
		// margin-top: 100upx;//容器外边距距离
	}

	.us {
		// padding-top: 100upx;//容器内边距距离
		background-color: blue; //容器背景颜色
		width: 48%; //容器宽度
		height: 100upx; //容器高度
		line-height: 100upx; //行高，文字上下居中
		color: white; //文字颜色
		text-align: center; //文字左右居中
		border-radius: 20upx; //容器边缘角
	}
</style>