<template>
  <view class="Keyboard1">
    <view class="box_22">
      <view class="box_25" style="margin-left: 8rpx;">
        <view v-for="(item, index) in items1" :key="index" @click="handleClick1(item, selectedItems1)"
          :class="{ 'highlighted': selectedItems1.includes(item), 'text-wrapper_22': !selectedItems1.includes(item) }">
          <text lines="1" class="text_27">{{ item }}</text>
        </view>
      </view>
      <view class="box_9"></view>
      <view class="box_25" style="padding-left: 17rpx;">
        <view v-for="(item, index) in items2" :key="index" @click="handleClick2(item, selectedItems2)"
          :class="{ 'highlighted': selectedItems2.includes(item), 'text-wrapper_22': !selectedItems2.includes(item) }">
          <text lines="1" class="text_27">{{ item }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, toRefs } from 'vue';
	const props = defineProps(['items1', 'selectedItems1', 'handleClick1', 'items2', 'selectedItems2', 'handleClick2']);
	const { items1, selectedItems1, handleClick1, items2, selectedItems2, handleClick2 } = toRefs(props);

</script>

<style scoped lang="scss">
.Keyboard1 {
		.highlighted:active,
		.text-wrapper_83:active,
		.text-wrapper_22:active,
		.text-wrapper_52:active {
			background-color: #FFB023;
			animation: text-wrapper_23 0.4s infinite;
		}

		.box_22 {
			margin: 25rpx;
			flex-direction: row;
			display: flex;
			justify-content: center;

			.box_9 {
				background-color: rgba(255, 176, 35, 0.300000);
				width: 2rpx;
				height: 506rpx;
				display: flex;
				flex-direction: column;

			}
		}

		.box_23 {
			display: flex;
			flex-direction: column;
		}

		.text-wrapper_22 {
			width: 25rpx;
			text-align: center;
			background-color: rgba(255, 255, 255, 1.000000);
			border-radius: 8rpx;
			margin-top: 8rpx;
			float: left;
			padding: 0rpx 20rpx;
			margin-right: 10rpx;
		}

		.text_27 {
			overflow-wrap: break-word;
			color: rgba(51, 51, 51, 1);
			font-size: 28rpx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			line-height: 28rpx;
		}


		.box_25 {

			.highlighted {
				background-color: #FFB023;
				width: 25rpx;
				text-align: center;
				border-radius: 8rpx;
				margin-top: 8rpx;
				float: left;
				padding: 0rpx 20rpx;
				margin-right: 10rpx;
			}
		}




	}
</style>
