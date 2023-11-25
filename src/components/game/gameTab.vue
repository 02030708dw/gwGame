<template>
	<view class="headerTab">
		<view class="headerLabel"
			:style="{
			backgroundColor:props.countId==item.id?props.backActive:'',
			'color':props.countId==item.id
			 
			?'#fff':''
			}"
			@click="handleActive(item.id)" v-for="(item,index) in props.typeTab" :key="index">{{item.label}} </view>
	</view>
</template> 

<script setup lang="ts">
	const props = defineProps(['typeTab', 'countId', 'backActive']);
	const emits = defineEmits(['handleActives'])
	const handleActive = (id : number) => {
		emits('handleActives', id)
	}
</script>

<style scoped lang="scss">
	.headerTab {
		width: 94%; 
		margin: 0 auto;
		margin-top: 20rpx;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-bottom: 20rpx;



	}

	.headerLabel {
		width: 18%;
		padding: 5px 4rpx; 
		text-align: center;
		background: #FFFFFF;
		border-radius: 4px;
		margin-bottom: 20rpx;
		color: #000;
	}

	.active {

		border-radius: 4px;
	}
</style>