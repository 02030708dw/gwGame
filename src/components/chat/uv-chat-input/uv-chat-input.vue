<template>
	<view class="bottomFiexd">
		<view class="uv-chat-input">
			<view class="textareainput">
				<textarea :auto-focus="autoFocus" v-model="val" :fixed="true" :adjust-position="true"
					:show-confirm-bar="false" cursor-spacing="20" :auto-height="true" placeholder=""></textarea>
			</view>
			<view>
				<button @click="onSend" class="send">发送</button>

			</view>
			<view class="bottomAdd" @click="handleAdd">
				<image src="../../../static/images/timImg/add.png" mode=""></image>
			</view>
		</view>
		<view class="bottomParams" v-if="bottomSettings">
			<view class="bottomOne" v-for="(items,index) in settingList" :key='items.id'
				@click="handleBottom(items.id)">
				<view class="bottomOneImg">
					<image :src="items.path" mode=""></image>
				</view>
				<view class="bottomOneText">
					{{items.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		useTIMStore
	} from "@/plugins/chat"
	let val = ref('');
	const TIMStore = useTIMStore();
	// 获取焦点
	const autoFocus = ref(false);
	const bottomSettings = ref(false);

	// #515151
	const settingList = ref([{
		id: 1,
		title: '照片',
		path: "../../../static/images/timImg/imgs.png"
	}]);

	const emits = defineEmits(['sendChat', 'sendChatImage'])
	const onSend = () => {
		let _v = val.value;
		if (_v == '') return

		emits('sendChat', _v)
		val.value = ''

	}
	const handleAdd = () => {
		bottomSettings.value = !bottomSettings.value
	}
	const handleBottom = (id) => {
		emits('sendChatType', id)

	}
</script>

<style scoped lang="scss">
	.bottomAdd {
		width: 50upx;
		height: 50upx;
		margin-left: 20upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.bottomFiexd {
		background-color: #f5f5f5;
		padding: 0 20upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		.bottomParams {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-bottom: 20upx;

			.bottomOne {
				width: 120upx;
				height: 120upx;
				border-radius: 18upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-color: #fff;

				.bottomOneImg {
					image {
						width: 50upx;
						height: 50upx;
					}
				}

				.bottomOneText {
					font-size: 24upx;
					color: #999;
				}
			}
		}
	}

	.send {
		background-color: #0D9E79;
		font-size: 25rpx;
		line-height: 60rpx;
		color: #fff;
	}

	.uv-chat-input {


		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;


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