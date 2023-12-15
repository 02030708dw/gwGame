<template>
	<view style="background-color: gainsboro;height: 100%;">
		<gameHeader :showContent="!showHeaderContent" activeTitle="投注纪录详情" />
		<view style="margin: 10px;">
			<view class="item-box"
				:class="['box', {'lost-status': status === '0','win-status': status === '1', 'other-status': status === '2'}]">
				<u-cell-group>
					<u-cell title="注单编号:" :value="name" center></u-cell>
					<u-cell title="注单时间:" :value="date" center></u-cell>
				</u-cell-group>
				<span class="triangle-text"
					:style="{ color: status === '1' ? 'white' : (status === '0' ? '#333' : 'white') }">
					{{ status === '1' ? '中奖' : (status === '0' ? '未中奖' : '未开奖') }}
				</span>
			</view>
			<view class="item-box" style="margin-top: 2%;" >
				<u-cell-group>
					<u-cell title="输入:" :value="name" center></u-cell>
					<u-cell title="输入:" :value="date" center></u-cell>
					<u-cell title="输入:" :value="name" center></u-cell>
					<u-cell title="输入:" :value="date" center></u-cell>
					<u-cell title="输入:" ></u-cell>
					<u-cell title="输入:" ></u-cell>
					<u-cell title="输入:" ></u-cell>
					<u-cell title="输入:" ></u-cell>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import gameHeader from '@/components/game/gameHeader.vue';
	import { ref, defineProps } from 'vue';

	const showHeaderContent = ref(true);

	const { name, date, status } = defineProps(['name', 'date', 'status']);
</script>

<style scoped>
	.box {
		position: relative;
	}
	.item-box{
		background-color: #FFF;
	}
	/deep/.u-cell__body__content {
		flex: none;
	}

	.box::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		border-width: 0 90px 40px 0;
		border-style: solid;
	}

	.lost-status::before {
		border-color: transparent #aaaaaa transparent transparent;
	}

	.win-status::before {
		border-color: transparent red transparent transparent;
	}

	.other-status::before {
		border-color: transparent #c7c7c7 transparent transparent;
	}

	.triangle-text {
		position: absolute;
		top: 5px;
		right: 1px;
		transform: rotate(30deg);
	}
	
	
	 .wrap {
	        padding: 12px;
	    }
	
	    .demo-layout {
	        height: 25px;
	        border-radius: 4px;
			text-align: center;
	    }
	
	
</style>