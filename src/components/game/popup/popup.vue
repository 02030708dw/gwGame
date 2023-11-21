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

				<view class="bettingList" v-for="(item,index) in 3" :key="index">
					<view class="bettingTit"> [30-3 dhsjdfs 038]</view>
					<view class="bettingTitN"> 450</view>
					<view class="bettingInput bettingList2">
						<u-input class="bettingI" border="none" placeholder="10"></u-input>
						<text class="bettingT">Tmis</text>
					</view>
					<image class="bettingDel" src="../../../static/images/del.png" mode=""></image>
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
	import gameFooterPopup from "@/components/game/gameFooterPopup";

	const storeGame = useGame();
	const storeCommon = useCommon();
	const { heightH } = storeToRefs(storeCommon)
	const { isBetting } = storeToRefs(storeGame)
	const handleClose = () => {
		storeGame.isBetting = !storeGame.isBetting
	}
</script>

<style scoped lang="scss">
	@import url("./css/game.scss");
</style>