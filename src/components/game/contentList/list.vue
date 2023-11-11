<template>

	<view class="headerAB">
		<view class="headerA">
			<view class="headerC">
				<view class="headerN bColor0">
					1
				</view>
			</view>
			<view class="headerC">
				<view class="headerN bColor1">
					12
				</view>
			</view>
			<view class="headerC">
				<view class="headerN bColor2">33</view>

			</view>
			<view class="headerC"> </view>
			<view class="headerC"> </view>
			<view class="headerC"> </view>
		</view>
		<view class="headerA">
			<view class="headerB"> </view>
			<view class="headerB"> </view>
			<view class="headerB"> </view>
			<view class="headerB"> </view>
			<view class="headerB"> </view>
			<view class="headerB"> </view>
		</view>
	</view>


</template>

<script setup lang="ts">
	const props = defineProps(['typeTab'])
</script>

<style scoped lang="scss">
	.headerAB {
		display: flex;
		flex-direction: row;
	}


	.headerC,
	.headerB,
	.headerN {
		width: 19.8px;
		height: 19.6px;
		background-color: #fff;
	}

	.headerN {
		font-size: 12px; 
		border-radius: 19.8px;
		background-color: aqua;
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.headerC:nth-child(even) {
		background-color: #FEF0E0;
	}

	.headerB:nth-child(odd) {
		background-color: #FEF0E0;
	}
</style>