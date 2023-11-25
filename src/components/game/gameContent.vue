<template>
	<view class="headerContent headerAB" >
		<view class="headerContentB">
			
		</view>
		<list :data="data"/>
		 
	 
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue"
	import list from "./contentList/list.vue"
	const data =ref([
		{list:[1,2,3,4,5]},
		{list:['',11,22,13]},
		{list:['',11,22,13,'']},
		{list:['',11,'',13,4]},
		{list:['','',22,56,9,90]},
	])
	
</script>

<style scoped lang="scss">
	.headerContent {
		width: 96%;
		margin: 0 auto;
		height: 118px;
		border: 2rpx solid #FEB02D;
		    overflow: hidden;
			position: relative;
			background-image: url('../../static/images/backgroundimg.png');
			background-size: contain;
			// background-repeat: no-repeat;
	}
	.headerContentB{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
	}

	.headerAB {
		display: flex;
		flex-direction: row;
	}
	 
</style>