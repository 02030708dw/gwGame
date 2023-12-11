<template>
	<gameHeader active-title="泰国彩"/>
	<gameHeaderTab :typeTab="typeTab" />
	<gameContent />
	<gameTime />
	<slotFredHill v-if="contryId==1">
		<gameFredHillAuto @handleId="handleId" :backActive="oneActive" :TabData="TabData" :urls="urls1" />
		<gameFredHillAuto @handleId="handleId" :backActive="twoActive" :TabData="TabDataTwo" :urls="urls2" />

	</slotFredHill>
	<slotFredHill v-if="contryId==2">
		<gameFredHill @handleId="handleId1D2D3D" :backActive="oneActive" :TabData="TabDataTaiGuo" :urls="urls1" />
		<gameFredHill2 @handleId="handleIdFredHill" :backActive="twoActive" :TabData="TabDataTwo1D2D3D" :urls="urls2" />

	</slotFredHill>
	<gameFredHillAuto @handleId="handleId" :backActive="threeActive" :TabData="TabDataAll" :urls="urls3" />
	<gameFooter />
	<popup />


</template>

<script setup lang="ts">
	import { reactive, ref } from "vue";
	import { storeToRefs } from "pinia";
	import gameHeader from "@/components/game/gameHeader";
	import gameContent from "@/components/game/gameContent";
	import gameTime from "@/components/game/gameTime";
	import gameFooter from "@/components/game/gameFooter";
	import popup from "@/components/game/popup/popup";

	import slotFredHill from "@/components/game/slotFredHill";
	import gameFredHill from "@/components/game/gameFredHill";
	import gameFredHill2 from "@/components/game/gameFredHill2";

	import gameFredHillAuto from "@/components/game/gameFredHillAuto";
	import gameHeaderTab from "@/components/game/gameHeaderTab";
	import { useCommon } from "@/plugins/pinia/common.pinia";


	let urls1 = ref('../../static/images/fredHill1.png')
	let urls2 = ref('../../static/images/fredHill2.png')
	let urls3 = ref('../../static/images/fredHill3.png')

	const storeCommon = useCommon();
	const { contryId, TabData, TabDataTaiGuo,oneActive, twoActive, threeActive, TabDataTwo, TabDataAll, TabDataTwo1D2D3D } = storeToRefs(storeCommon)

	const handleId1D2D3D = (id : number) => {
		   
		 storeCommon.TabDataTwoCheckedID =0
		 storeCommon.TabDataTwo1D2D3DID =id 
		 
		 storeCommon.handletabs()
		 storeCommon.setTabDataTwo1D2D3D(storeCommon.TabDataTwo1D2D3DID)
		console.log('选择的ID11111', id)
	}

	const handleIdFredHill = () => {
		console.log('选择的ID33333', storeCommon.TabDataTwo1D2D3DID)
		 
		// storeCommon.handletabs()
		storeCommon.setTabDataTwo1D2D3D(storeCommon.TabDataTwo1D2D3DID)
	}
	const handleId = (id : number) => {
		console.log('选择的ID22222', id)

	}

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

</style>