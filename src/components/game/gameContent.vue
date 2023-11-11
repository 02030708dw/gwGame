<template>
	<view class="headerContent headerAB">
		<list />
		<list />
		<list />
		<list />
		<list />
		<list />
		<list />
		<list />
		<list />
		<list />
	</view>
</template>

<script setup lang="ts">
	import list from "./contentList/list.vue"
	const props = defineProps(['typeTab'])
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