 <script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	onLaunch(() => { });
	onShow(() => {
		console.log("App Show");
	});
	onHide(() => {
		console.log("App Hide");
	});
 </script>
 <style lang="scss" scoped>
 	@import "uview-plus/index.scss";
	@import url("@/static/css/animate.css");
 	:deep(body) uni-page-body {
 		// height: 100%;
		// background-color: ghostwhite
		background-color: #f9f9f9;
		// 页面背景色
 	}
	.bgcolor{
		padding: 10px 15px;
	}
	.box-body{
		//background-color: #fff;
		//padding: 10px;
	}
 </style>