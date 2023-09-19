<!--
  @Author: ranjingqiao
 -->
<script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	onLaunch(() => {
		console.log("App Launch");
		//获取客户端ID
		const getClientUdId = () => {
			//获取客户端ID和版本号
			var clientid = '';
			// #ifdef APP-PLUS
			// 苹果系统
			plus.device.getInfo({

				success: function (e) {
					clientid = e.uuid;
					uni.setStorageSync('deviceId', clientid);
				},
				fail: function (e) {
					console.log(e);

				}

			});
			// 安卓系统
			plus.device.getAAID({
				success: function (e) {

					clientid = e.aaid;
					console.log(clientid);
					uni.setStorageSync('deviceId', clientid);

				},
				fail: function (e) {
					console.log(e);
					getDeviceUUID()
				}

			});
			//老版本、安卓模拟器
			if (clientid == '') {
				clientid = plus.device.uuid || '';
				uni.setStorageSync('deviceId', clientid);

			}
			// #endif

			uni.setStorageSync('deviceId', clientid);
			// return clientid;
			uni.showModal({
				title: '这是唯一标识',
				content: clientid,
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		}
		// #ifdef APP-PLUS
		getClientUdId()
		// #endif
		 
		const getDeviceUUID = () => {
			var clientId = plus.device.uuid;
			console.log('老版本、安卓模拟器: ' + clientId);
			uni.setStorageSync('deviceId', clientId);
			// user.deviceLogin('uuid')
		}
	});
	onShow(() => {
		console.log("App Show");
	});
	onHide(() => {
		console.log("App Hide");
	});
</script>
<style lang="scss">
	@import "uview-plus/index.scss";

	uni-page-body {
		height: 100%;
	}

	.upl {
		width: 140rpx;
		height: 140rpx;
		border: 1px solid #f5f5f5;
		border-radius: 10rpx;
		margin: 20rpx;
		line-height: 140rpx;
		text-align: center;
		color: #f5f5f5;
	}

	.example-body {
		padding: 10px;
		padding-top: 0;
	}

	.custom-image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.text {
		font-size: 14px;
		color: #333;
	}
</style>