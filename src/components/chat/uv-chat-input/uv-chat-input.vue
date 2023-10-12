<template>
	<view class="uv-chat-input"> 
		<view class="textareainput">
			<textarea v-model="val" :fixed="true" :adjust-position="true" :show-confirm-bar="false" cursor-spacing="20"
				:auto-height="true" placeholder=""></textarea>
		</view>
		<view>
			<button @click="onSend" class="send">发送</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	let val = ref('')
	const emits = defineEmits(['sendChat'])
	const onSend = () => {
		let _v = val.value;
		val.value = ''
		emits('sendChat', _v)
	}
</script>

<style scoped lang="scss">
	.send {
		background-color: #0D9E79;
		font-size: 25rpx;
		line-height: 60rpx;
		color: #fff;
	}

	.uv-chat-input {
		padding: 0 20upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #f5f5f5;

		.textareainput {
			flex: 1;
			background-color: #fff;
			border-radius: 14rpx;
			overflow: hidden;
			padding: 20upx;
			margin: 20upx 20upx 20upx 0;

			textarea {
				// padding: 20rpx;
				// width: 100%;
				// background-color: #f4f5f7;
				max-height: 326rpx;
			}
		}

	}
</style>