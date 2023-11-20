<template>
	<view class="headerFred" :style="{backgroundImage: 'url('+ props.urls +')'}">
		<view class="headerFredTitle">
			Fred Hill
		</view>
		<gameTab :backActive="props.backActive" :H="props.H" :W="props.W" @handleActives="handleActives" :countId="countId" :typeTab="props.TabData" />
	</view>
</template>

<script setup lang="ts">
	import {  ref } from "vue";
	import gameTab from "./gameTab.vue"
	const props = defineProps(['urls','TabData','H','W','backActive']);
	const emits=defineEmits(['handleId'])
	const countId = ref(1);
 
	const handleActives = (id : number) => {
		countId.value = id;
		emits('handleId',id)
	}
</script>

<style scoped lang="scss">
	.headerFredTitle {
		font-size: 22px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		margin-top: 30rpx;
		padding-left: 20rpx;
	}

	.headerFred {
		width: 96%;
		display: flex;
		flex-direction: column;
        margin: 0 auto; 
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>