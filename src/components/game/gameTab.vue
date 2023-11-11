<template>
	<view class="headerTab">
		<view class="headerLabel" :class="props.countId==item.id?'active':''" @click="handleActive(item.id)" v-for="(item,index) in props.typeTab" :key="index">{{item.label}} </view>
	</view>
</template>

<script setup lang="ts">
	const props = defineProps(['typeTab','countId']);
	const emits=defineEmits(['handleActives'])
	const handleActive= (id:number) =>{
		emits('handleActives',id)
	}
</script>

<style scoped lang="scss">
 
	.headerTab {
		width: 94%;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row; 
		justify-content: space-between;
		 
		 

	}

	.headerLabel {
		width: 18%;
		height: 66rpx;
		line-height: 66rpx;
		text-align: center;
		background: #FFFFFF;
		border-radius: 4px;
	}
	.active{
		background: #FFB023;
		border-radius: 4px;
	}
</style>