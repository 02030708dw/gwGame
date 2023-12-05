<template>
	<u-popup :show="isBetting" mode="bottom" :round="10">
		<view class="bettingBac">
			<view class="betting">
				<view class="bettingB">
					<view class="bettingNum">20230902-0998 </view>
					<view class="bettingBet"> Bet Details </view>
				</view>
				<view class="bettingClose" @click="handleClose">
					<image src="../../../static/images/close.png" mode=""></image>
				</view>
			</view>
			<scroll-view class="mb100" scroll-y="true" :style="`height:  ${heightH}rpx`" scroll-with-animation="true">

				<view class="bettingList animate__backOutLeft" v-for="(item,index) in historyList" :key="index"
					v-if='historyList.length>0'>
					<view class="bettingTit"> [{{item.title}}]</view>
					<view class="bettingTitN"> {{Number(item.price)+100}}</view>
					<view class="bettingInput bettingList2">
						<u-input class="bettingI" border="none" v-model="item.price" placeholder=""></u-input>
						<text class="bettingT">Tmis</text>
					</view>
					<image class="bettingDel" src="../../../static/images/del.png" @click="handleDelete(item)" mode="">
					</image>
				</view>
				<view class="noData" v-else>
					暂无历史记录
				</view>
			</scroll-view>

			<gameFooterPopup />
		</view>

	</u-popup>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { storeToRefs } from "pinia";
	import { useCommon } from "@/plugins/pinia/common.pinia";
	import { useGame } from "@/plugins/pinia/Game.pinia";
	import { useCreactGame } from "@/plugins/pinia/CreactGame.pinia";
	import gameFooterPopup from "@/components/game/gameFooterPopup";

	const storeGame = useGame();
	const storeCreactGame = useCreactGame();
	const storeCommon = useCommon();
	const { heightH } = storeToRefs(storeCommon);
	const { isBetting } = storeToRefs(storeGame);
	const { historyList } = storeToRefs(storeCreactGame);


	const handleClose = () => {
		storeGame.isBetting = !storeGame.isBetting
	}
	const handleDelete = (item : any) => {
		const list = storeCreactGame.historyList.filter((items) => items.id != item.id);
		storeCreactGame.saveHistoryList(list)
		
		uni.showToast({
			title: "删除成功"
		})
		// uni.showModal({
		// 	title: 'Tips',
		// 	content: '你确定删除吗？',
		// 	cancelText: 'Cancel',
		// 	confirmText: 'confirm',
		// 	success: function (res) {
		// 		if (res.confirm) {
					 
		// 		} else if (res.cancel) {
		// 			console.log('取消');
		// 		}
		// 	}

		// })

	}
</script>

<style scoped lang="scss">
	@import url("./css/game.scss");
</style>