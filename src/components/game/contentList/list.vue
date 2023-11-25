<template>
	<view class="headerAB">
		<view class="headerA" v-for="(item,index) in props.data" :key="index">
			<view class="headerC" v-for="(items,i) in item.list" :key="i">
				<view class="headerN" :class="`${filterBall(items)}`">{{items}} </view>
			</view>
		</view>
	</view>

</template>

<script setup lang="ts">
	const props = defineProps(['data']);
	const filterBall = (items : any) => {
        if(items==''){
			return 'transparent'
		}
		if (items < 10) {
			return 'ball10'
		}
		if (items >= 10 && items <= 20) {
			return 'ball20'
		}
		if (items > 20) {
			return 'ball30'
		}
	}
</script>

<style scoped lang="scss">
	.headerAB {
		display: flex;
		flex-direction: row;
	}


	.headerC,
	.headerB,
	.headerN {
		width: 19.8px;
		height: 19.6px; 
	}

	.headerN {
		font-size: 12px;
		border-radius: 19.8px;
		background-color: aqua;
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.headerC:nth-child(even) {
		background-color: #FEF0E0;
	}

	.headerB:nth-child(odd) {
		background-color: #FEF0E0;
	}


    .transparent{
		background: transparent; 
		
	}
	.ball10 {
		background: linear-gradient(168deg, #FFFFFF 0%, #F43C3E 100%);
	}

	.ball20 {
		background: linear-gradient(168deg, #FFFFFF 0%, #2FD68C 100%);
	}

	.ball30 {
		background: linear-gradient(168deg, #FFFFFF 0%, #5D7CD2 100%);
	}
</style>