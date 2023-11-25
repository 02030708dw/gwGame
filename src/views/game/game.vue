<template>
	<gameHeader />
	<gameHeaderTab   :typeTab="typeTab" />
	<gameContent />
	<gameTime />
	<slotFredHill v-if="contryId==1">
		<gameFredHillAuto @handleId="handleId" :backActive="oneActive" :TabData="TabData" :urls="urls1" />
		<gameFredHillAuto @handleId="handleId" :backActive="twoActive" :TabData="TabDataTwo" :urls="urls2" />

	</slotFredHill> 
	<slotFredHill v-if="contryId==2">
		<gameFredHill @handleId="handleId" :backActive="oneActive" :TabData="TabData" :urls="urls1" />
		<gameFredHill @handleId="handleId" :backActive="twoActive" :TabData="TabDataTwo" :urls="urls2" />

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

	import gameFredHillAuto from "@/components/game/gameFredHillAuto";
	import gameHeaderTab from "@/components/game/gameHeaderTab";
	import { useCommon } from "@/plugins/pinia/common.pinia"; 


	let urls1 = ref('../../static/images/fredHill1.png')
	let urls2 = ref('../../static/images/fredHill2.png')
	let urls3 = ref('../../static/images/fredHill3.png')
 
	const storeCommon = useCommon();
	const { contryId, TabData, oneActive, twoActive,threeActive, TabDataTwo, TabDataAll } = storeToRefs(storeCommon)

 
	const handleId = (id : number) => {
		console.log('选择的ID', id)
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