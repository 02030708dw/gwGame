<template>
	<view class="headerContent headerAB">
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
	}

	.headerAB {
		display: flex;
		flex-direction: row;
	}
</style>