<template>
    <view class="game-type">
        <view class="type-item" v-for="item in typeList" @click="cutGameType(item)" :class="item.checked?'type-active':''">
			{{item.label}}
        </view>
    </view>
</template>
<script setup lang="ts">
    const props=defineProps(['typeList'])
	const emits=defineEmits(['cutGameType'])
	const cutGameType=(item:any)=>{
		emits('cutGameType',item)
	}
	console.log(props.typeList)
</script>
<style scoped lang="scss">
.game-type{
	margin-top: 32rpx;
    width:686rpx;
    height:62rpx;
	display: flex;
	justify-content: space-between;
	.type-item{
		transition: all 0.3s linear;
		background-color: #FFE2B4;
		width: 158rpx;
		height: 62rpx;
		text-align: center;
		font-size: 36rpx;
		line-height: 62rpx;
		box-shadow: 0rpx 4rpx 4rpx 0rpx #DA900C;
	}
	.type-active{
		background-color: #FFB023;
	}
}
</style>