<template>
	<gameHeader />
	<gameHeaderTab :typeTab="typeTab" />
	<gameContent />
	<gameTime />
	<gameFredHill :urls="urls1" />
	<gameFredHill :urls="urls2" />
	<gameFredHill :urls="urls3" />
	<gameFooter />


	<u-popup :show="storeGame.isBetting" mode="bottom" :round="10">
		<view class="bettingBac">
			<view class="betting">
				<view class="bettingB">
					<view class="bettingNum">20230902-0998 </view>
					<view class="bettingBet"> Bet Details </view>
				</view>
				<view class="bettingClose">
					<image src="../../static/images/close.png" mode=""></image>
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
					<image class="bettingDel" src="../../static/images/del.png" mode=""></image>
				</view>
			</scroll-view>
		 
			<gameFooterPopup />
		</view>

	</u-popup>
</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
	import gameHeader from "@/components/game/gameHeader";
	import gameContent from "@/components/game/gameContent";
	import gameTime from "@/components/game/gameTime";
	import gameFooter from "@/components/game/gameFooter";
	import gameFooterPopup from "@/components/game/gameFooterPopup";
	 
	import gameFredHill from "@/components/game/gameFredHill";
	import gameHeaderTab from "@/components/game/gameHeaderTab";
	import { useGame } from "@/plugins/pinia/Game.pinia";
	const storeGame = useGame()
    const heightH =ref(480)
	let urls1 = ref('../../static/images/fredHill1.png')
	let urls2 = ref('../../static/images/fredHill2.png')
	let urls3 = ref('../../static/images/fredHill3.png')
	/**
	 * 
	 * 类型切换
	*/
	const typeTab = reactive([
		{ label: "动画", id: 1 },
		{ label: "直播", id: 2 },
		{ label: "视频", id: 3 },
		{ label: "新闻", id: 4 },
	])
</script>

<style scoped lang="scss">
	@import url("./css/game.scss");
</style>