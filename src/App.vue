<!--
  @Author: ranjingqiao
 -->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
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
uni-page-body{
  height: 100%;
}
.upl{
  width:140rpx;height:140rpx;
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
