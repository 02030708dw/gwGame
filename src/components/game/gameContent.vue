<template>
	<view class="headerContent headerAB">
		<view class="headerContentB">
			
		</view>
		<view class="backColor" v-for="(item,index) in 50" :key="index"> </view>
		<list :data="data"/>
		 
	 
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue"
	import list from "./contentList/list.vue"
	const props = defineProps(['typeTab'])
	const data =ref([
		{list:[1,2,3,4,5]},
		{list:['',11,22,13,'']} 
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
	.backColor{
		width: 19.8px;
		height: 19.6px; 
	}
	.backColor:nth-child(odd){
		background-color: red;
	}
</style>