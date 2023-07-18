<template>
	<view class="titles-btn">
		 <u-button class="titles-btn-color"   :style="{'backgroundColor':  bcc,'color':colors}">{{content}}</u-button>
	</view>
</template>


<script> 
	export default {
		props: ['content','bcc','colors'],
		components: {

		},
		data() {
			return {
				 

			};
		},
		// 触底加载更多
		onReachBottom() {

		},
		onLoad() {

		},

		methods: {}
	};
</script>

<style scoped>
 .titles-btn{
	 width: 100%;
	 margin: 0 auto;
 }
 .titles-btn-color{
	 color: #fff;
	 height: 80upx;
	 border-radius: 6px;
 }
</style>