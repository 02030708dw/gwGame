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
 <style lang="scss">
 	@import "uview-plus/index.scss";
	@import url("@/static/css/animate.css");
 	uni-page-body {
 		height: 100%;
		background-color: ghostwhite
 	}
	
	.bgcolor{
		padding: 10px 15px;
	}
	.box-body{
		//background-color: #fff;
		//padding: 10px;
	}
 </style>