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
 	}
 </style>