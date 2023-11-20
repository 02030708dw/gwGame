<template>
	<gameHeader /> 
	<gameHeaderTab @handleContry="handleContry" :typeTab="typeTab" />
	<gameContent />
	<gameTime />
	<gameFredHill @handleId="handleId" :backActive="storeCommon.oneActive" :TabData="storeCommon.TabData" :urls="urls1" />
	<gameFredHill @handleId="handleId" :backActive="storeCommon.twoActive"  :TabData="storeCommon.TabDataTwo" :urls="urls2" />
	<gameFredHill @handleId="handleId" :backActive="storeCommon.oneActive" :TabData="TabData" :urls="urls3" />
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
	import { useCommon } from "@/plugins/pinia/common.pinia";
	let urls1 = ref('../../static/images/fredHill1.png')
	let urls2 = ref('../../static/images/fredHill2.png')
	let urls3 = ref('../../static/images/fredHill3.png')

	const storeCommon = useCommon();
	const contryId = ref(1);
	const handleContry = (item : any) => {
		console.log('选择的国家', item.id)
		contryId.value = item.id;
		if (item.id == 2) {
			storeCommon.setTabData(item.id)
		}
	}
	const handleId = (id : number) => {
		console.log('选择的ID', id)
	}



	/**
		 * 
		 * 类型切换
		*/
	const TabData = ref([
		{ label: "0", id: 0 },
		{ label: "1", id: 1 },
		{ label: "2", id: 2 },
		{ label: "3", id: 3 },
		{ label: "4", id: 4 },
		{ label: "5", id: 5 },
		{ label: "6", id: 6 },
		{ label: "7", id: 7 },
		{ label: "8", id: 8 },
		{ label: "9", id: 9 },
	])
	 
	import { useGame } from "@/plugins/pinia/Game.pinia";
	const storeGame = useGame()
    const heightH =ref(480) 
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